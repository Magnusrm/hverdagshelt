//@flow
import React, {Component} from "react";
import {
    Grid, Row, Col, ListGroup,ListGroupItem, ToggleButtonGroup,ToggleButton,ButtonToolbar, MenuItem, FormGroup, FormControl,PageHeader,Button, ControlLabel
} from "react-bootstrap"

import {ChooseCategory} from "../ChooseCategory/ChooseCategory";
import {CategoryService} from "../../services";


let categoryService = new CategoryService();

interface State {

    newCategoryName: string,
}

interface Props{}

//Lag et skrivefelt der man kan skrive inn en ny kategori
// Velg plass kattegoriebn skal være i
// Knapp plasser katteori her
//Sette en kategorikomponent inn i siden
//Finn måte å hente dataene som kommer når man trykker på kategoriene
//Sjekke at den ikke er lik noen andre kategorier

//Spørsmål hvordan vet man hvilken kategori den har tatt
//Hva er det som skal stå på prioritet kan admin velge det? og hva er skalaen
//Prioritet 1,2,3

export class adminAddCategory extends Component<Props,State> {


    constructor(){
        super()
        this.state = {
            newCategoryName: '',
            selectedCategoryId: -1,
            selectedCategoryType:-1,
            newPriority: null


        };
    }


    onChangeCategoryHeader=(name1,name2)=>{
        this.setState({selectedCategoryId: name1 ,selectedCategoryType:name2 });

    };

    onClickHovedkategori=()=>{
        this.setState({
            selectedCategoryType: 0,

        });
    };

    handleChange = (statename: string) => (event: SyntheticEvent<HTMLInputElement>) : void=> {
        this.setState({
            // $FlowFixMe
            [statename] : event.target.value,
        })
    };

    handlePriority=(pri: number)=> {
        console.log(this.state.newPriority);
      this.setState({ newPriority : pri})
        console.log(this.state.newPriority);
    };

    saveCategory=()=>{

        if(this.state.newCategoryName != '' && this.state.selectedCategoryType == 0) {
            let theBody1: Object = {
                name: this.state.newCategoryName,
                priority: this.state.newPriority,
            };
        categoryService.addCategory1(theBody1);
        }

        if(this.state.newCategoryName != '' && this.state.selectedCategoryType == 1) {
            let theBody2: Object = {
                categoryId: this.state.selectedCategoryId,
                name: this.state.newCategoryName,
            };
            categoryService.addCategory2(theBody2);
        }

        if(this.state.newCategoryName != '' && this.state.selectedCategoryType == 2) {
            let theBody3: Object = {
                category2Id: this.state.selectedCategoryId,
                name: this.state.newCategoryName,
            };
            categoryService.addCategory3(theBody3);
        }
    };



    render(){
        return(
            <Grid>
                <Col>
                <FormGroup className="text-center">
                    <PageHeader>Sideoverskrift</PageHeader>
                    <ControlLabel >Kategori navn</ControlLabel>
                    <FormControl  type="text" placeholder="Skriv inn kategorinavn" onChange={this.handleChange('newCategoryName')}></FormControl>
                    <ControlLabel >Velg overkategori</ControlLabel>
                    <ListGroup>
                        <ListGroupItem onClick={()=> this.onClickHovedkategori()}>Registrer som hovedkategori</ListGroupItem>
                    </ListGroup>
                    <ControlLabel >Prioritet: </ControlLabel>
                    <Button onClick={()=>this.handlePriority(1)}>1-Meget-Viktig</Button>
                    <Button onClick={()=>this.handlePriority(2)}>2-Viktig</Button>
                    <Button onClick={()=>this.handlePriority(3)}>3-Lite-Viktig</Button>


                    <ChooseCategory changeCategoryHeader={this.onChangeCategoryHeader.bind(this) } registerCategory={true}/>
                </FormGroup>
                <Button onClick={()=> this.saveCategory()}>Lagre kategori</Button>
                </Col>
            </Grid>
        );

    }



}