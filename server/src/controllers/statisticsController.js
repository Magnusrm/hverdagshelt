let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app: Object, statisticsDao: Object) {
  app.get("/issueCategories/:countyName", (req, res) => {
    console.log("Counting statuses in issues");
    statisticsDao.getNumberStatus(req.params.countyName, (status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.get("/issuesDaily/:countyName", (req, res) => {
    console.log("Counting issues pr day");
    statisticsDao.getIssuesDaily(req.params.countyName, (status, data) => {
      res.status(status);
      res.json(data);
    })
  })

  app.get("/issueCategoriesAllCounties/", (req, res) => {
    console.log("Counting statuses in issues ALL COUNTIES");
    statisticsDao.getNumberStatusAllCounties((status, data) => {
      res.status(status);
      res.json(data);
    });
  });

  app.get("/issuesDailyAllCounties/", (req, res) => {
    console.log("Counting issues pr day ALL COUNTIES");
    statisticsDao.getIssuesDailyAllCounties((status, data) => {
      res.status(status);
      res.json(data);
    })
  })
}
