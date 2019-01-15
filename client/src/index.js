// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert } from './widgets';
import { WizardFormComplete } from "./components/ReduxRegisterForm/WizardFormComplete";
import store from "./components/ReduxRegisterForm/store";
import { Provider } from "react-redux";
import { MapComponent } from "./components/map/Map"
import { NavbarMenu } from "./components/NavbarMenu/NavbarMenu";
import { Login } from "./views/login/login";
import { KontoOversikt } from "./components/KontoOversikt/KontoOversikt";
import { countySubscription } from "./components/countySubscription";
import {RegisterUser} from './components/registeruser/registeruser';
import {RegisterCompany} from "./components/registercompany/registercompany.js";
// Reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
    let script = document.createElement('script');
    script.src = '/reload/reload.js';
    if (document.body) document.body.appendChild(script);
}

import createHashHistory from 'history/createHashHistory';
import {MineSaker} from "./views/MinSide/mineSaker/mineSaker";
import {MinSide} from "./views/MinSide/MinSide";
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student


const root = document.getElementById('root');
if (root)
    ReactDOM.render(
        <HashRouter>
            <div className="route-container">
                <NavbarMenu/>
                <Route exact path="/register" component={RegisterUser}/>
                <Route exact path="/register/company" component={RegisterCompany}/>
                <Route exact path="/registerIssue" component={RegisterIssue}/>
                <Route path="/countySubscription/:userMail" component={countySubscription}/>
                <Route path="/wizardForm" component={WizardFormComplete} />
                <Route path="/countySubscription/:userMail" component={ countySubscription }/>
                <Route path="/min_side/kontooversikt" component={KontoOversikt}/>
                <Route path="/login" component={Login}/>
                <Route path="/map" component={ MapComponent } />
                <Route path="/login" component={Login} />
                <Route path="/min_side" component={MinSide} />
                <Route path="/min_side/mine_saker" component={MineSaker}/>
            </div>
        </HashRouter>,
        root
    );
