import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,Container, Card, Col, Row, Button, Form, FormGroup, Label, Input, FormText , Table, Media, CardText} from 'reactstrap';
import {CountyService, UserService, getCounties} from "../../services";
import {Component} from 'react';
import * as React from 'react';
import {Alert} from "../../widgets";
import ReactDOM from 'react-dom';
import {County} from "../../classTypes";
import DropdownButton from "react-bootstrap/es/DropdownButton";
import MenuItem from "react-bootstrap/es/MenuItem";

let countyService = new CountyService();
let userService = new UserService();

interface State{
    mail: string;
    firstName: string;
    lastName: string;
    password: string;
    password2: string;
    typeName: string;
    phone: string;
    points: number;
    countyId: number;
    countyName: string;
    active: number;
    isLoaded: boolean;
}
interface Props{
    match: Object,
}

class BindDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choosen: {name: "Bergen", countyId: 1},
            values:[
                {name: "Bergen", countyId: 1}
                //{ name: this.county.name, countyId: this.county.countyId}
            ]
        }

        this.handleChangeCounty = this.handleChangeCounty.bind(this)
    }

    handleChangeCounty(e: Object){
        console.log(this.state.choosen.countyId)
        this.setState({
            choosen: JSON.parse(e.target.value)
        })


    };

    componentWillMount() {
        var arr = [];
        countyService
            .getCounties()
            .then(county2 => {
                county2.map(e => {
                    var elem = {
                        name: e.name,
                        countyId: e.countyId
                    };
                    arr = arr.concat(elem)

                });
                this.setState({
                    values: arr
                })
            })


                //this.state.countyName.push(this.state.county.name)})
            .catch((error: Error)=>Alert.danger(error.message))

    }



    render(){
        let optionTemplate = this.state.values.map(v => {
            var data = {name: v.name, countyId: v.countyId}
            return(<option key={v.countyId} value={JSON.stringify(data)}> {v.name}</option>)
        });
        return (
            <label>
                Velg Kommune:
                <select value={this.state.values.countyId} onChange={this.handleChangeCounty}>
                    {optionTemplate}
                </select>
            </label>
        )
    }
}

export class RegisterUser extends Component<Props, State>{

    /*state = {
        mail: "",
        firstName: "",
        lastName: "",
        postnumber: 0,
        password: "",
        password2: "",
        typeName: "",
        phone: 0,
        points: 0,
        active: 0,
        isLoaded: false,
    };*/
    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            firstName: "",
            lastName: "",
            postnumber: 0,
            password: "",
            password2: "",
            typeName: "",
            phone: 0,
            points: 0,
            active: 0,
            isLoaded: false,
            choosen: {name: "Bergen", countyId: 1},
            values:[
                {name: "Bergen", countyId: 1}
                //{ name: this.county.name, countyId: this.county.countyId}
            ]
        }

        this.handleChangeCounty = this.handleChangeCounty.bind(this)
    }


    handleChangeCounty(e: Object){
        console.log(this.state.choosen.countyId)
        this.setState({
            choosen: JSON.parse(e.target.value)
        })
    };

    componentWillMount() {
        var arr = [];
        countyService
            .getCounties()
            .then(county2 => {
                county2.map(e => {
                    var elem = {
                        name: e.name,
                        countyId: e.countyId
                    };
                    arr = arr.concat(elem)

                });
                this.setState({
                    values: arr
                })
            })


            //this.state.countyName.push(this.state.county.name)})
            .catch((error: Error)=>Alert.danger(error.message))

    }

    handleStringChange = (name: string) =>(event:SyntheticEvent<HTMLInputElement>)=>{
        this.setState({
            // $FlowFixMe
            [name]:event.target.value,
        })
    };

    handleNumberChange = (value: number) =>(event:SyntheticEvent<HTMLInputElement>)=>{
        this.setState({
            // $FlowFixMe
            [value]:event.target.value,
        })
    };



    render(){
        let optionTemplate = this.state.values.map(v => {
            var data = {name: v.name, countyId: v.countyId}
            return(<option key={v.countyId} value={JSON.stringify(data)}> {v.name}</option>)
        });
        return(
            <Container>
                <Form>
                    <Label>Registrer bruker</Label>
                    <Row>
                            <FormGroup>
                                <Col>
                                    <Input type="text" value={this.state.firstName} placeholder="Fornavn"
                                           onChange={this.handleStringChange("firstName")}
                                    />
                                </Col>
                            </FormGroup>
                            {' '}
                            <FormGroup>
                                <Col>
                                    <Input type="text" value={this.state.lastName} placeholder="Etternavn"
                                           onChange={this.handleStringChange("lastName")}
                                    />
                                </Col>
                            </FormGroup>
                                {' '}
                    </Row>
                    <Row>
                        <FormGroup>
                            <Col>
                                <Input type="text" value={this.state.phone} placeholder="Telefonnummer"
                                onChange={this.handleNumberChange("phone")}
                                />
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Col>
                                <label>
                                    Velg Kommune:
                                    <select value={this.state.values.countyId} onChange={this.handleChangeCounty}>
                                        {optionTemplate}
                                    </select>
                                </label>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Col sm="12">
                                <Input type="text" value={this.state.mail} placeholder="Epost"
                                onChange={this.handleStringChange("mail")}
                                />
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Col>
                                <Input type="text" value={this.state.password} placeholder="Passord"
                                       onChange={this.handleStringChange("password")}
                                />
                            </Col>
                        </FormGroup>
                        {' '}
                        <FormGroup>
                            <Col>
                                <Input type="text" value={this.state.password2} placeholder="Gjenta passord"
                                       onChange={this.handleStringChange("password2")}
                                />
                            </Col>
                        </FormGroup>
                        {' '}
                    </Row>
                    <Button type="button" onClick={this.checkMail}>Registrer</Button>
                </Form>
            </Container>
        );
    }
    checkMail = () =>{
        var validator = require("email-validator");

        if(!(validator.validate(this.state.mail))){
            Alert.warning("Eposten eksisterer ikke")
        }else{
            this.register();
        }
    }

    checkPass = () => {

        if (this.state.password !== this.state.password2) {
            console.log("To ulike passord");
            Alert.warning("Du skrev to ulike passord");
        }
        else {
            let decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
            if(this.state.password.match(decimal))
            {
                this.register();
            }
            else
            {
                Alert.warning('Password has to be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character')
            }
        }

    }




    register = () => {
        console.log("test", this.state);
        var mail = this.state.mail
        var firstName = this.state.firstName
        var lastName = this.state.lastName
        var password = this.state.password
        var phone = this.state.phone
        var countyId = this.state.choosen.countyId
        console.log("county", countyId)
        userService
            .addUser(this.state.mail, this.state.firstName, this.state.lastName, this.state.password, this.state.phone, this.state.choosen.countyId)
            .then(user =>(this.state = user)).then(Alert.success("Bruker registrert"))
            .catch((error: Error)=>Alert.danger(error.message))
    };
}
/*
* <DropdownButton title="Hjemmekommune">
                                     value={this.state.countyName}
                                              onChange={(e)=>this.handleChangeCounty(e)}>
                                        {this.state.countyName.map((r, i) => {
                                            return <option key={i} value={r}>{r}
                                            </option>
                                        })
                                        }

                                </DropdownButton>

    checkPass(){
        console.log(state);
        if(this.state.password==this.state.password2){
            this.register();
            Alert.success();
        }else{
            Alert.warning();
        }
    }


*/