import {
  Alert,
  Col,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
  ButtonGroup,
  Button,
  Form,
  FormGroup,
  Label,
  Grid,
  Row
} from 'react-bootstrap';
import { CountyService, NotificationSettingsService, UserService } from '../../services';
import { Component } from 'react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import {County} from "../../classTypes";
import {FormControl} from "react-bootstrap";
import Select from "react-select";
import {history} from "../../index";
import {PageHeader} from "../pageHeader/PageHeader";

let countyService = new CountyService();
let userService = new UserService();
let notificationSettingService = new NotificationSettingsService();

/**
 * @class RegisterAdmin
 */
export class RegisterAdmin extends Component<Props, State>{

    constructor(props) {
        super(props);
        this.handleDismissErrorSomething = this.handleDismissErrorSomething.bind(this);
        this.handleDismissUserExists = this.handleDismissUserExists.bind(this);
        this.handleDismissErrorButton = this.handleDismissErrorButton.bind(this);
        this.state = {
            errorButton: false,
            buttonValue: 0,
            userExists: false,
            errorSomething: false,
            countyIsChanged: false,
            mail: "",
            mail2:"",
            firstName: "",
            lastName: "",
            address: "",
            postNumber: "",
            password: "",
            password2: "",
            typeName: "",
            phone: "",
            points: 0,
            active: 0,
            isLoaded: false,
            choosen: {label: "Bergen", countyId: 1},
            values:[
                {label: "Bergen", countyId: 1}
                //{ name: this.county.name, countyId: this.county.countyId}
            ]
        };
        this.handleButtonChange = this.handleButtonChange.bind(this);
        this.handleChangeCounty = this.handleChangeCounty.bind(this);
    }
    handleButtonChange(e){
        this.setState({buttonValue: e});
    }
    handleDismissErrorButton() {
        this.setState({errorButton: false });
    }
    handleDismissUserExists() {
        this.setState({userExists: false });
    }
    handleDismissErrorSomething() {
        this.setState({errorSomething: false});
    }



    handleChangeCounty(e: Object){
        this.setState({
            choosen: JSON.parse(e.value),
            countyIsChanged: true
        })
    };

   async componentWillMount() {
       await userService.getCurrentUser().then(response=>{
           if(response[0].typeName==="Private" || response[0].typeName === undefined){
               history.push('/welcomePage/' + window.sessionStorage.getItem('CountyId'));
           }
       }).catch((error: Error) => confirm(error.message));
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

    handleNumberChange = (value: number) => (event: SyntheticEvent<HTMLInputElement>) => {
        const re = /^[0-9\b]+$/;
        if(event.target.value === '' ||re.test(event.target.value)){
            this.setState({
                // $FlowFixMe
                [value]: event.target.value
            });
        }
    };

    /**
     * returns success or warning depending on if the string written matches the criteria in the function
     *
     * @method getValidationStateEmail
     * @returns {string}
     */
    getValidationStateEmail(){
        var validator = require('email-validator');
        const length = this.state.mail.length;
        const bool = validator.validate(this.state.mail);
        if(length==0) return ;
        else if(!(bool)) return 'warning';
        else if(bool) return 'success';
    }

    /**
     * returns success or warning depending on if the string written matches the criteria in the function
     *
     * @method getValidationStateEmail2
     * @returns {string}
     */
    getValidationStateEmail2(){
        var validator = require('email-validator');
        const length = this.state.mail2.length;
        const bool = validator.validate(this.state.mail2);
        if(length==0)return;
        else if(!(bool)) return 'warning';
        else if(bool && this.state.mail===this.state.mail2) return 'success';
        else return 'warning';
    }

    /**
     * returns success or warning depending on if the string written matches the criteria in the function
     *
     * @method getValidationStateFirstName
     * @returns {string}
     */
    getValidationStateFirstName() {
        const firstNameLength = this.state.firstName.length;
        let decimal=/^[A-Za-z ÆØÅæøå]*[A-Za-z ÆØÅæøå][A-Za-z ÆØÅæøå]*$/;

        if(firstNameLength===1){
            return 'warning';
        } else if(firstNameLength===0) return ;
        else if(this.state.firstName.match(decimal)){
            return 'success';
        } else{
            return 'warning'
        }
    }

    /**
     * returns success or warning depending on if the string written matches the criteria in the function
     *
     * @method getValidationStateLastName
     * @returns {string}
     */
    getValidationStateLastName() {
        const lastNameLength = this.state.lastName.length;
        let dec=/^[A-Za-z ÆØÅæøå]*[A-Za-z ÆØÅæøå][A-Za-z ÆØÅæøå]*$/;

        if(lastNameLength===1){
            return 'warning';
        } else if(lastNameLength===0) return ;
        else if(this.state.lastName.match(dec)){
            return 'success';
        } else{
            return 'warning'
        }
    }

    /**
     * returns success or warning depending on if the string written matches the criteria in the function
     *
     * @method getValidationPhone
     * @returns {string}
     */
    getValidationPhone(){
        const phoneLength = this.state.phone.length;
        let decimal =/^(\d|,)*\d*$/;
        if(phoneLength ==8 && this.state.phone.match(decimal)) {
            return 'success';
        }
        else if(phoneLength==0)return ;
        else{
            return 'warning';
        }
    }

    /**
     * returns success or warning depending on if the string written matches the criteria in the function
     *
     * @method getValidationAdress
     * @returns {string}
     */
    getValidationAddress(){
        const addressLength = this.state.address.length;
        let decimal=/^[A-Za-z0-9 _æøå]*[A-Za-z0-9æøå][A-Za-z0-9 _æøå]*$/;

        if(addressLength<4 && addressLength>0){
            return 'warning';
        } else if(addressLength===0) return ;
        else if(this.state.address.match(decimal)){
            return 'success';
        } else{
            return 'warning'
        }
    }
    /**
     * returns success or warning depending on if the string written matches the criteria in the function
     *
     * @method getValidationPostNumber
     * @returns {string}
     */
    getValidationPostNumber(){
        const postNumberLength= this.state.postNumber.length;
        let decimal =/^(\d|,)*\d*$/;
        if(postNumberLength ==4 && this.state.postNumber.match(decimal)) {
            return 'success';
        }
        else if(postNumberLength==0)return ;
        else{
            return 'warning';
        }
    }

  buttonBack() {
    this.props.history.goBack();
  }

  render() {
    let optionTemplate = this.state.values.map(v => {
      const data = { label: v.name, value: v.countyId, countyId: v.countyId };
      return (data);
    });
    let alert_something;
    if (this.state.errorSomething) {
      alert_something = (
        <Alert bsStyle="danger" onDismiss={this.handleDismissErrorSomething}>
          <p id="errorSome">Pass på at alle felt er fylt ut korrekt</p>
        </Alert>);
    } else {
      alert_something = (
        <p></p>
      );
    }
    let register_success;
    if (this.state.registerSuccess) {
      register_success = (
        <Alert bsStyle="success">
          <p id="SuccessLogin">Bruker ble registrert</p>
        </Alert>
      );
    }
    let error_button;
    if (this.state.errorButton) {
      error_button = (
        <Alert bsStyle="danger" onDismiss={this.handleDismissErrorButton}>
          <p id="errorBtn">Velg admin eller kommuneansatt</p>
        </Alert>
      );
    } else {
      <p></p>;
    }
    let alert_user_exists;
    if (this.state.userExists) {
      alert_user_exists = (
        <Alert bsStyle="danger" onDismiss={this.handleDismissUserExists}>
          <h6>Emailen er allerede registrert</h6>
        </Alert>);
    } else {
      <p></p>;
    }
    return (
      <div className="bottomFooter">
        <i id="backButton" onClick={() => this.buttonBack()} className="fas fa-arrow-circle-left"></i>
        <Grid>
          <Col md={3}></Col>
          <Col md={6}>
            <PageHeader title={'Registrer bruker'}/>


                    <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail">
                            <FormGroup>
                                <FormGroup>
                                    <Col md={3}></Col>
                                    <Col md={6}>

                                    </Col>
                                    <Col md={3}></Col>
                                </FormGroup>
                                <Col md={3}/>
                                <Col md={6}>
                                    <div align="center">
                                    <FormGroup>
                                        <ButtonToolbar>
                                            <ToggleButtonGroup type="radio" name="chooseType" onChange={this.handleButtonChange}>
                                                <ToggleButton style={{"width":"10em"}} value={1}>Admin</ToggleButton>
                                                <ToggleButton style={{"width":"10em"}} value={2}>Kommuneansatt</ToggleButton>
                                            </ToggleButtonGroup>
                                        </ButtonToolbar>
                                    </FormGroup>
                                    </div>
                                </Col>
                                <Col md={3}/>
                                <Col md={6}>
                                    <FormGroup validationState={this.getValidationStateFirstName()}>
                                        <FormControl type="text" value={this.state.firstName} placeholder="Fornavn"
                                                     onChange={this.handleStringChange("firstName")}
                                        />
                                        <FormControl.Feedback/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup validationState={this.getValidationStateLastName()}>
                                        <FormControl type="text" value={this.state.lastName} placeholder="Etternavn"
                                                     onChange={this.handleStringChange("lastName")}/>
                                        <FormControl.Feedback/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup validationState={this.getValidationAddress()}>
                                        <FormControl type="text" value={this.state.address} placeholder="Addresse"
                                                     onChange={this.handleStringChange("address")}
                                        />
                                        <FormControl.Feedback/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Select
                                            placeholder={"Søk hjemmekommune"}
                                            name="colors"
                                            options={optionTemplate}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={this.handleChangeCounty}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup validationState={this.getValidationPostNumber()}>
                                        <FormControl type="text" value={this.state.postNumber} placeholder="Postnummer"
                                                     onChange={this.handleNumberChange("postNumber")}/>
                                        <FormControl.Feedback/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup validationState={this.getValidationPhone()}>
                                        <FormControl type="text" value={this.state.phone} placeholder="Telefonnummer"
                                                     onChange={this.handleNumberChange("phone")}
                                        />
                                        <FormControl.Feedback/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup validationState={this.getValidationStateEmail()}>
                                        <FormControl type="text" value={this.state.mail} placeholder="Epost"
                                                     onChange={this.handleStringChange("mail")}/>
                                        <FormControl.Feedback/>
                                    </FormGroup>
                                </Col>
                                <Col md={6} >
                                    <FormGroup validationState={this.getValidationStateEmail2()}>
                                        <FormControl type="text" value={this.state.mail2} placeholder="Gjenta epost"
                                                     onChange={this.handleStringChange("mail2")}/>
                                        <FormControl.Feedback/>
                                    </FormGroup>
                                </Col>
                        </FormGroup>
                            <Col md={4}/>
                            <Col md={4}>
                                <FormGroup>
                                    {alert_something}
                                    {register_success}
                                    {error_button}
                                    {alert_user_exists}
                                </FormGroup>
                            </Col>
                            <Col md={4}/>
                            <FormGroup>
                                <Col md={4}/>
                                <Col md={4}>
                                    <div align="center">
                                        <Button type="button" onClick={this.checkInput}>Registrer</Button>
                                    </div>
                                </Col>
                                <Col md={4}/>
                            </FormGroup>
                            <FormGroup>
                            </FormGroup>
                        </FormGroup>
                    </Form>
                </Col>
                <Col md={3}></Col>
            </Grid>
          </div>
        );
    }
    checkInput = () =>{
        if(this.state.buttonValue===0){
            this.setState({errorButton:true, errorSomething: false})
        };

        if(this.state.errorButton===0||this.state.countyIsChanged===false || this.getValidationStateFirstName()==='warning' || this.getValidationStateLastName()==='warning' || this.getValidationPhone()==='warning' || this.getValidationStateEmail()==='warning' || this.getValidationStateEmail2()==='warning' || this.getValidationPostNumber()==='warning' || this.getValidationAddress()==='warning'){
            this.setState({
                errorSomething:true,
                errorButton:false
            });
        }else{
            if(this.state.buttonValue===1) {
                this.register().catch(error => {
                    console.log(error.message)
                });

            }else if(this.state.buttonValue===2){
                this.register2().catch(error => {
                    console.log(error.message)
                });

            }
        }
    };

    register = async () => {

        let userExists;
        await userService.getUserLogin(this.state.mail)
            .then(r => {
                userExists = (r[0] !== undefined);
                console.log(r[0])
            });

        if (!userExists) {
            const newAdmin = {
                mail: this.state.mail,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                typeName: 'Admin',
                address: this.state.address,
                postNumber: this.state.postNumber,
                phone: this.state.phone,
                countyId: this.state.choosen,
            };
            await userService
                .addAdmin(newAdmin)
                .then(user => this.state = user)
                .catch((error: Error) => Alert.danger(error.message));

            let theBody: Object = {
                mail: newAdmin.mail,
                registered: 1,
                inProgress: 0,
                completed: 1
            };
            await notificationSettingService.addIssueNotificationSettings(theBody);
            await this.setState({errorSomething: false, errorButton: false, registerSuccess: true, userExists: false});
            await this.goToRegNew();
        } else {
            this.setState({errorSomething: false, registerSuccess: false, userExists: true});

        }

    };
    register2 = async () => {


        let userExists;
        await userService.getUserLogin(this.state.mail)
            .then(r => {
                userExists = (r[0] !== undefined);
            });

        if (!userExists) {
            const newEmployee = {
                mail: this.state.mail,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                typeName: 'Employee',
                address: this.state.address,
                postNumber: this.state.postNumber,
                phone: this.state.phone,
                countyId: this.state.choosen,
            };
            await userService
                .addAdmin(newEmployee)
                .then(user => (this.state = user))
                .catch((error: Error) => Alert.danger(error.message));

            let theBody: Object = {
                mail: newEmployee.mail,
                registered: 1,
                inProgress: 0,
                completed: 1
            };
            await notificationSettingService.addIssueNotificationSettings(theBody);
            await this.setState({errorSomething: false, errorButton: false, registerSuccess: true, userExists: false});
            await this.goToRegNew();
        } else {
            this.setState({errorSomething: false, registerSuccess: false, userExists: true});
        }


    };
    goToRegNew = () => {
        setTimeout(
            function () {
                history.push('/handlinger');
            }, 2000
        )
    };
}