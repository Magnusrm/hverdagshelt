// @flow

import {Dao} from "../dao";

export class CompanyDao extends Dao{

    getCompanyIssue(id: string, callback: Function){
        super.query("select * from issues where companyMail = ?",
            [id],
            callback
        );
    }


}



