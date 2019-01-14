// @flow

let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports = function (app: Object, companyDao: Object) {

    app.get('/getCompanyIssue/:companyMail:', (req, res)=>{
        console.log("getCompanyIssue got request");
        companyDao.getCompanyIssue((status, data)=>{
            res.status(status);
            res.json(data);
        })
    })


}