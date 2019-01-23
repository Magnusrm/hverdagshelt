// @flow

import ReactDOM from "react-dom";
import * as React from "react";
import { Component } from "react";
import { User } from "../../classTypes";
import { UserService } from "../../services";
import { Alert, FormGroup, Form, FormControl, Button, Grid, Image, Row, Col } from "react-bootstrap";

let jwt = require("jsonwebtoken");
import login from "./login.css";
import { history } from "../../index";

let userService = new UserService();
const bcrypt = require("bcrypt-nodejs");

interface State {
  error: boolean;
  email: string;
  password: string;
  storedPassword: string;
  countyId: 0;
  string: "./logo.png";
} //end interface

interface Props {
  notLoggedIn: boolean;
} //end interface

export class Login extends Component<Props, State> {
  state = {
    error: false,
    email: "",
    password: "",
    storedPassword: "",
    countyId: 0,
    string: "./logo.png"
  };

  handleChangeEmail = (event: SyntheticEvent<HTMLButtonElement>) => {
    this.setState({
      email: event.target.value
    });
  };

  handleChangePassword = (event: SyntheticEvent<HTMLButtonElement>) => {
    this.setState({
      password: event.target.value
    });
  };

  render() {
    let alert_login;

    if (this.state.error) {
      alert_login = (
        <Alert bsStyle="danger">
          <h6>Brukernavn eller passord er feil. Prøv igjen!</h6>
        </Alert>
      );
    } else {
      alert_login = <p />;
    }

    let alert_notLoggedIn;
    if (this.props.notLoggedIn) {
      alert_notLoggedIn = confirm("Du må være logget inn for å gå videre");
    } else {
      <p />;
    } //end condition

    return (
      <div className="login">
        <Grid>
          <Form>
            <Col sm={2} md={3} />

            <Col sm={8} md={6}>
              <div align="center">
                <Image
                  className="picture"
                  src={"./resources/logo_white.png"}
                  rounded
                />
              </div>

              <div className="loginBox">
                <Row className="show-grid">
                  <FormGroup>
                    <FormControl
                      type="text"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleChangeEmail.bind(this)}
                    />
                  </FormGroup>
                </Row>

                <Row className="show-grid" align="center">
                  <FormGroup>
                    <FormControl
                      type="password"
                      placeholder="Passord"
                      value={this.state.password}
                      onChange={this.handleChangePassword.bind(this)}
                    />
                  </FormGroup>
                </Row>

                <Row className="show-grid" align="center">
                  <Button type="button" onClick={this.save} bsStyle="primary">
                    Login
                  </Button>
                  <Button type="button" onClick={this.sjekk}>
                    Sjekk
                  </Button>
                  {alert_login}
                  {alert_notLoggedIn}
                </Row>

                <div align="center">
                  <p>Har du ikke bruker?</p>

                  <p>Registrer deg <a href={'/#/registrer/privat'}>her hvis du er privatperson</a>, og <a
                    href="/#/registrer/bedrift"> her hvis du er

                    bedrift.</a></p>
                    <p>
                        <a href={"/#/forgotPassword"}>Glemt passord</a>
                    </p>
                </div>
              </div>
            </Col>

            <Col sm={2} md={3} />
          </Form>
        </Grid>
      </div>
    );
  } //end method

  save = () => {
    //console.log(this.state.email);
    userService
      .getUserLogin(this.state.email)
      .then(response => {
        this.setState({
          countyId: response[0].countyId,
          storedPassword: response[0].password
        });

        bcrypt.compare(
          this.state.password,
          response[0].password,
          (err, res) => {
            if (res) {
              userService
                .login({
                  userMail: response[0].mail,
                  typeId: response[0].typeName
                })
                .then(r => {
                  let token = r.jwt;
                  window.localStorage.setItem("userToken", token);
                  console.log("login in success");

                  console.log(this.props.history.location.pathname);
                  if (
                    this.props.history.location.pathname == "/login" ||
                    this.props.history.location.pathname == "/register/company"
                  ) {
                    console.log("hei");
                    history.push("/wizardForm");
                  } else {
                    console.log(this.props.history.location.pathname);
                    this.props.history.goBack();
                  }
                })
                .catch((error: Error) => Alert.danger(error.message));
            } else {
              //check if the email is a company email
              userService
                .getCompanyLogin(this.state.email)
                .then(r => {
                  bcrypt.compare(
                    this.state.password,
                    r[0].password,
                    (err, res) => {
                      if (res) {
                        userService
                          .login({ userMail: r[0].mail, typeId: "Company" })
                          .then(r => {
                            let token = r.jwt;
                            window.localStorage.setItem("userToken", token);
                            console.log("login in success");

                            console.log(this.props.history.location.pathname);
                            if (
                              this.props.history.location.pathname ==
                                "/register" ||
                              this.props.history.location.pathname ==
                                "/register/company"
                            ) {
                              console.log("hei");
                              history.push("/wizardForm");
                            } else {
                              console.log(this.props.history.location.pathname);
                              this.props.history.goBack();
                            }
                          })
                          .catch((error: Error) => Alert.danger(error.message));
                      } else {
                        this.setState({
                          error: true
                        });
                      } //end condition
                    }
                  );
                })
                .catch((error: Error) => {
                  console.log(error);
                  this.setState({
                    error: true
                  });
                });
            } //end condition
          }
        );
      })
      .catch((error: Error) => {
        userService
          .getCompanyLogin(this.state.email)
          .then(r => {
            bcrypt.compare(this.state.password, r[0].password, (err, res) => {
              if (res) {
                userService
                  .login({ userMail: this.state.email, typeId: "Company" })
                  .then(r => {
                    let token = r.jwt;
                    window.localStorage.setItem("userToken", token);
                    console.log("login in success");
                    console.log(this.props.history.location.pathname);
                    if (
                      this.props.history.location.pathname == "/register" ||
                      this.props.history.location.pathname ==
                        "/registrer/bedrift"
                    ) {
                      console.log("hei");
                      history.push("/wizardForm");
                    } else {
                      console.log(this.props.history.location.pathname);
                      this.props.history.goBack();
                    }
                  })
                  .catch((error: Error) => {
                    console.log(error);
                    this.setState({
                      error: true
                    });
                  });
              } else {
                this.setState({
                  error: true
                });
              } //end condition
            });
          })
          .catch((error: Error) => {
            console.log(error);
            this.setState({
              error: true
            });
          });
      });
  }; //end method

  sjekk = () => {
    let decoded = jwt.verify(
      window.localStorage.getItem("userToken"),
      "shhhhhverysecret"
    );
    console.log(decoded.email + "\n" + "type: " + decoded.typeId);
    userService.getUser(decoded.email).then(e => {
      console.log(e);
    });
  };
} //end class
