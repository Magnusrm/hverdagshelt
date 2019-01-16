// @flow

import React from 'react';
import jwt from 'jsonwebtoken';
import {Grid, Row, Col, ListGroup, ListGroupItem, Tabs, Tab} from 'react-bootstrap';
import {User} from "../../classTypes";
import Button from "react-bootstrap/es/Button";
import {MyIssuesNotificationSettingsForm} from "../MyIssuesNotificationSettingsForm/MyIssuesNotificationSettingsForm";
import {NotificationSettingsForm} from "../NotificationSettingsForm/NotificationSettingsForm";


interface State {
    decoded: Object,
    user: User,
    categoryChoises: number[],

}

export class NotificationSettings extends React.Component <State> {

    state = {
        decoded: jwt.verify(window.localStorage.getItem('userToken'), "shhhhhverysecret"),
        user: null,
        categoryChoises: []
    };



    render() {
        return(
            <Grid>
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Hjemkommune">
                    <NotificationSettingsForm />
                </Tab>
                <Tab eventKey={2} title="Andre kommuner">
                    Tab 2 content
                </Tab>
                <Tab eventKey={3} title="Mine saker">
                    <MyIssuesNotificationSettingsForm />
                </Tab>
            </Tabs>
            </Grid>
        );
    }
}