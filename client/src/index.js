// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';

import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert } from './widgets';
import { ExampleEvents } from './components/map/Map'

import { WizardFormComplete } from "./components/ReduxRegisterForm/WizardFormComplete";
import store from "./components/ReduxRegisterForm/store";
import { Provider } from "react-redux";
import {NavbarMenu} from "./components/NavbarMenu/NavbarMenu";
import {Login} from "./views/login/login";
import {MinSide} from "./views/MinSide/MinSide";
//import {RegisterIssue} from "./components/RegisterIssue.js";
import {countySubscription} from "./components/countySubscription.js";
import {adminAddCategory} from "./components/AdminAddCategory/adminAddCategory";

// Reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
    let script = document.createElement('script');
    script.src = '/reload/reload.js';
    if (document.body) document.body.appendChild(script);
}

import createHashHistory from "history/createHashHistory";

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

const root = document.getElementById("root");
if (root)
    ReactDOM.render(
        <HashRouter>
            <div>
                <Alert/>
                <NavbarMenu/>
                <Route path="/WizardForm" component={WizardFormComplete} />
                <Route path="/countySubscription/:userMail" component={countySubscription}/>
                <Route path="/min_side" component={MinSide}/>
                <Route path="/login" component={Login}/>
                <Route path="/addCategory" component={adminAddCategory}/>
            </div>
        </HashRouter>,
        root
    );
