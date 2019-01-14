import {Component} from "react-simplified"
import React from "react"
//import {Layout} from './widgets';
import { Col, Row, Button, Form, FormGroup, Label, FormText , Table, Media, CardText} from 'react-bootstrap';

export class RegisterUser extends Component{

    user = {};

    render(){
        return(
            <Form>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Input type="text" value={this.user.firstName} placeholder="Fornavn"
                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>{
                                       if(this.user) this.user.overskrift = event.target.value;
                                   }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" value={this.user.lastName} placeholder="Etternavn"
                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>{
                                       if(this.user) this.user.lastName = event.target.value;
                                   }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" value={this.user.address} placeholder="Addresse"
                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>{
                                       if(this.user) this.user.address = event.target.value;
                                   }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" value={this.user.postNumber} placeholder="Postnummer"
                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>{
                                       if(this.user) this.user.postNumber = event.target.value;
                                   }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" value={this.user.email} placeholder="Epost"
                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>{
                                       if(this.user) this.user.email = event.target.value;
                                   }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" value={this.user.phone} placeholder="Telefonnummer"
                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>{
                                       if(this.user) this.user.phone = event.target.value;
                                   }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" value={this.user.password} placeholder="Passord"
                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>{
                                       if(this.user) this.user.password = event.target.value;
                                   }}
                            />
                        </FormGroup>
                        <FormGroup>/*lage test for å sjekke om passord er like*/
                            <Input type="text" value={this.user.password2} placeholder="Gjenta passord"
                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>{
                                       if(this.user) this.user.password2 = event.target.value;
                                   }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" value={this.user.county} placeholder="Hjemmekommune"
                                   onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>{
                                       if(this.user) this.user.county = event.target.value;
                                   }}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Button type="button" onClick={this.addUser}>Registrer</Button>
            </Form>

        )
    }

}