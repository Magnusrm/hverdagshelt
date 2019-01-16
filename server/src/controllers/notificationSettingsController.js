// @flow

let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports = function (app: Object, notificationSettingsDao: Object) {

    app.get('/get_notification_settings/:email', urlencodedParser, (req, res) => {
        console.log('got request from get_notification_settings');

        notificationSettingsDao.getNotificationSettings(req.params.email, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.delete('/delete_notification_settings/:email', urlencodedParser, (req, res) => {
        console.log('got request from delete_notification_settings');

        notificationSettingsDao.deleteNotificationSettings(req.params.email, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.post('/add_notification_settings', urlencodedParser, (req, res) => {
        console.log('got request from add_notification_settings');

        notificationSettingsDao.addNotificationSettings(req.body, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.post('/add_issue_notification_settings', urlencodedParser, (req, res) => {
        console.log('got request from add_issue_notification_settings');

        notificationSettingsDao.addIssueNotificationSettings(req.body, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.get('/get_issue_notification_settings/:email', urlencodedParser, (req, res) => {
        console.log('got request from get_issue_notification_settings');

        notificationSettingsDao.getIssueNotificationSettings(req.params.email, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });

    app.put('/update_issue_notification_settings', urlencodedParser, (req, res) => {
        console.log('got request from update_issue_notification_settings');

        notificationSettingsDao.updateIssueNotificationSettings(req.body, (status, data) => {
            res.status(status);
            res.json(data);
        });
    });
};