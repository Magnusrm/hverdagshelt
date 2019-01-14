// @flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react';
import {User} from "../../classTypes";
import {Grid, Row, Col} from 'react-bootstrap';
import {UserService} from "../../services";
import {Alert} from "../../widgets";
import MenuItem from "react-bootstrap/es/MenuItem";
import Dropdown from "react-bootstrap/es/Dropdown";
import FormControl from "react-bootstrap/es/FormControl";
import DropdownButton from "react-bootstrap/es/DropdownButton";
import Button from "react-bootstrap/es/Button";
import {CustomMenu, CustomToggle} from "../../components/DropdownWSearch";
let jwt = require("jsonwebtoken");


let userService = new UserService();
const bcrypt = require('bcrypt-nodejs');

interface State {
    email: string;
    password: string;
    storedPassword: string;
}//end interface

interface Props{}

export class Login extends Component<Props,State>{
    state = {
        email: '',
        password: '',
        storedPassword: '',
    };



    handleChangeEmail = (event: SyntheticEvent<HTMLButtonElement>) => {
        this.setState({
            email: event.target.value,
        })
    };

    handleChangePassword = (event: SyntheticEvent<HTMLButtonElement>) => {
      this.setState({
          password: event.target.value,
      })
    };


    render(){
        return(
            <Grid>
                <div className="container text-md-center">
                    <br/>
                    <h2>Login</h2>
                    <br/>
                    <br/>
                    <br/>
                    <form>
                        <Row>
                            <Col>
                                <input placeholder='Email'
                                   type="text"
                                   value={this.state.email}
                                   onChange={this.handleChangeEmail}/>
                            </Col>
                            <Col>
                                <input placeholder='Passord'
                                    type="text"
                                    value={this.state.password}
                                    onChange={this.handleChangePassword}/>
                            </Col>
                        </Row>
                        <Row>
                            <br/>
                            <br/>
                        </Row>
                        <Row>
                            <Col>
                                <button type="button" className="btn btn-dark float-left" onClick={this.save}>
                                Login
                            </button>
                                <button type="button" className="btn btn-dark float-left" onClick={this.sjekk}>
                                    Sjekk
                                </button>
                            </Col>


                            <Col>
                                <Dropdown id="dropdown-custom-menu">
                                    <CustomToggle bsRole={"toggle"}/>

                                    <CustomMenu bsRole="menu">
                                        <MenuItem eventKey="1">Red</MenuItem>
                                        <MenuItem eventKey="2">Blue</MenuItem>
                                        <MenuItem eventKey="3" active>Orange</MenuItem>
                                        <MenuItem eventKey="1">Red-Orange</MenuItem>
                                    </CustomMenu>
                                </Dropdown>
                            </Col>
                        </Row>
                    </form>
                </div>
            </Grid>
        )
    }//end method


    save = () =>{
        //console.log(this.state.email);
        userService.getUserLogin(this.state.email).then(response => {
            this.setState({
                storedPassword: response[0].password,
            });
            bcrypt.compare(this.state.password, response[0].password,function (err,res) {
               if(res){
                    userService.login({ userMail : response[0].mail, typeId : response[0].typeName}).then(r => {
                        let token = r.jwt;
                       console.log('hello');
                        window.localStorage.setItem('userToken', token)
                    }).catch((error:Error) => Alert.danger(error.message));
               } else{
                   Alert.danger('Feil passord!');
               }//end condition
            });
        }).catch((error:Error) => Alert.danger(error.message));
    };//end method

    sjekk = () => {
        let decoded = jwt.verify(window.localStorage.getItem('userToken'), "shhhhhverysecret");
        console.log(decoded.email + '\n' + 'type: ' + decoded.typeId);
        userService.getUser(decoded.email)
            .then(e => {
                console.log(e);
            })
    }

}//end class

