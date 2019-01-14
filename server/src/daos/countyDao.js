// @flow

import {Dao} from "../dao";

const bcrypt = require('bcrypt'); //to hash password

export class CountyDao extends Dao {

    getAllCounties(callback: Function){
        super.query("select * from county where active=1",
            [],
            callback
        );
    }


    //get all counties where the user dosnt use
    getAllCountiesMinusUsers(id:string, callback: Function){
        super.query("SELECT * from county where (county.countyId = (SELECT userCounties.countyId FROM userCounties WHERE userCounties.userMail != 'ola@usermail.com') AND county.countyId NOT IN (SELECT userCounties.countyId FROM userCounties WHERE userCounties.userMail = 'ola@usermail.com')) OR county.countyId NOT IN (SELECT userCounties.countyId FROM userCounties)",
            [id],
            callback
        );
    }

    getSubscribedCounties(id: string, callback: Function){
        super.query("SELECT * FROM county NATURAL JOIN userCounties where userCounties.userMail = ?", [id], callback);
    }

    deleteAllSubscribedCounties(id:string, calback: Function){
        super.query("delete from userCounties where userMail =?",[id],calback);
    }

    addSubscription(json: Object, callback: Function){
        var body = [json.userMail,json.countyId ];
        super.query("insert into userCounties(userMail, countyId) value (?,?)",body,callback);
    }

}
/*SELECT * FROM county
where county.countyId = (SELECT userCounties.countyId FROM userCounties WHERE userCounties.userMail != 'ola@usermail.com' )
OR county.countyId NOT IN(SELECT userCounties.countyId FROM userCounties)*/