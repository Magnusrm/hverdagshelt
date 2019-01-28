//@flow
import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ToggleButtonGroup,
  ToggleButton,
  ButtonToolbar,
  MenuItem,
  FormGroup,
  FormControl,
  PageHeader,
  Button,
  ControlLabel, Alert
} from 'react-bootstrap';

import { ChooseCategory } from '../chooseCategory/ChooseCategory';
import { CategoryService } from '../../services';
import {Checkbox, Radio} from 'react-bootstrap';
import { CategorySelectList } from '../categorySelectList/CategorySelectList';
import {history} from "../../index";
import css from './adminAddCategory.css';


let categoryService = new CategoryService();


/**
 * @class adminAddCategory
 */
export class adminAddCategory extends Component<Props, State> {


  constructor() {
    super();
    this.state = {
      newCategoryName: {},
      selectedCategoryId: {},
      selectedCategoryType: {},
      newPriority: {},
      mainCategory: false,
      error: false,
      success: false
    };
    this.saveCategory = this.saveCategory.bind(this);
  }


  onChangeCategoryHeader = (name1, name2) => {
    this.setState({ selectedCategoryId: name1, selectedCategoryType: name2 });
    console.log(this.state.selectedCategoryId + ' hei' + this.state.selectedCategoryType);

  };

  onClickHovedkategori = () => {
    this.setState({
      mainCategory: !this.state.mainCategory
    });
  };

  handleChange = (statename: string) => (event: SyntheticEvent<HTMLInputElement>): void => {
    this.setState({
      // $FlowFixMe
      [statename]: event.target.value
    });
  };

  handlePriority = (pri: number) => {
    this.setState({ newPriority: pri });
  };

  buttonBack(){
    this.props.history.goBack();
  }

    /**
     * @method saveCategory
     * @returns {Promise<void>}
     */

  saveCategory = async () => {


    if (this.state.mainCategory) {

      if (this.state.newCategoryName == '') {
        this.setState({ error: true });
        return;
      }

      let theBody1: Object = {
        name: this.state.newCategoryName,
        priority: this.state.newPriority
      };

      console.log('body', theBody1);
      categoryService.addCategory1(theBody1).then(res => {
        console.log('added cat1', res);
        this.setState({success: true},() => {
          setTimeout(
              function () {
                console.log(this.props);
                history.push('/handlinger')
              }, 1000
          )
        });
        this.setState({ error: false });
      }).catch(error => {
        console.log(error);
        this.setState({ error: true });
      });

    } else {

      if (this.state.newCategoryName == '') {
        this.setState({ error: true });
        return;
      }

      let theBody2: Object = {
        categoryId: this.state.selectedCategoryType,
        name: this.state.newCategoryName
      };
      categoryService.addCategory2(theBody2).then(res => {
        console.log('added cat2', res);
        this.setState({success: true},() => {
          setTimeout(
              function () {
                console.log(this.props);
                history.push('/admin')
              }, 1000
          )
        });
        this.setState({ error: false });
      }).catch(error => {
        console.log(error);
        this.setState({ error: true });
      });

    }
  };


  onChangeCategory = (label, name) => {

    this.setState({ selectedCategoryId: name, selectedCategoryType: label });
  };


  render() {

    let mainCat;
    if (this.state.mainCategory) {
      mainCat = <div>
        <FormGroup>

          <div><ControlLabel>Prioritet</ControlLabel></div>
          <Radio onClick={() => this.handlePriority(1)} name="radioGroup" inline>
            Meget viktig
          </Radio>{' '}
          <Radio onClick={() => this.handlePriority(2)} name="radioGroup" inline>
            Viktig
          </Radio>{' '}
          <Radio onClick={() => this.handlePriority(3)} name="radioGroup" inline>Lite viktig
          </Radio>
        </FormGroup>
      </div>;

    } else {
      mainCat = <div><ControlLabel>Velg overkategori</ControlLabel>
        <CategorySelectList handleOnChangeCategory={this.onChangeCategory.bind(this)}/></div>;
    }

    let alert;
    if (this.state.error) {
      alert = (
        <Alert bsStyle="danger">
          <h5 >Noe gikk galt, er du sikkert på at du har valg alt du skal velge?</h5>
        </Alert>);
    } else {
      <span></span>;
    }

    let success;
    if(this.state.success){
      success = (
          <Alert bsStyle={"success"}>
            <h5 id="successText" >Du har lagt til kategorien {this.state.newCategoryName}</h5>
          </Alert>
      )
    }else{
      <span></span>;
    }//end condition


    return (
      <div className="bottomFooter"><i id="backButton"  onClick={()=> this.buttonBack()} className="fas fa-arrow-circle-left"></i>

      <Grid>

        <Col xs={0} md={2}></Col>

        <Col xs={12} md={8}>
          <FormGroup className="text-center">
            <PageHeader>Legg til en kategori</PageHeader>
            <ControlLabel>Kategori navn</ControlLabel>
            <FormControl type="text" placeholder="Skriv inn kategorinavn"
                         onChange={this.handleChange('newCategoryName')}></FormControl>
            <ListGroup>

              <br/>

              <FormGroup>
                <Checkbox inline onClick={() => this.onClickHovedkategori()}>Registrer som hovedkategori</Checkbox>
              </FormGroup>

            </ListGroup>


            {mainCat}

          </FormGroup>

          <div align="center">
            <Button bsStyle="primary" onClick={() => this.saveCategory()}>Lagre kategori</Button>
          </div>
          {alert}
          {success}
        </Col>

        <Col xs={0} md={2}></Col>
      </Grid>
      </div>
    );

  }


}