//@flow
import React, { Component } from 'react';
import { Layout } from '../../../widgets';
import { Grid, Row, Col, ListGroup, Glyphicon, Button, FormControl } from "react-bootstrap"
import {CountyService, UserService, NotificationSettingsService} from "../../../services";
import {Filter} from "../../../components/Filter/Filter";
import { PageHeader } from '../../../components/PageHeader/PageHeader';
import { User } from '../../../classTypes';

let countyService = new CountyService();
let userService = new UserService();
let notificationSettingsService = new NotificationSettingsService();
let filter = new Filter();
//Databasekall
//Få alle kommuner som finnes som er active og som bruker ikke abonerer på
// Få alle kommuner som den personen abonerer på
// On click add to


//Slett kommuner fra bruker
//Legg til kommuner på en bruker

// county(countId, name)

interface State {
  allCounties: Array<Object>,
  userCounties: Array<Object>,
  user: User
}

interface Props {
}

export class CountySubscription extends Component<Props, State> {

  state = {
    allCounties: [],
    userCounties: [],
    user: new User('', '', '', '', '', -1, -1, -1)
  };

  //fra Alle kommuner til abonerte kommuner
  addCounty = (name, index) => {

    const userArray = this.state.userCounties;
    const countyArray = this.state.allCounties;

    countyArray.splice(index, 1);
    this.inputText1.value="";
    filter.filterAll("");
    userArray.push(name);
    this.setState({
      userCounties: userArray,
      allCounties: countyArray
    });

  };

  //fra abonerte kommuner til alle kommuner
  deleteCounty = (name, index) => {

    const userArray = this.state.userCounties;
    const countyArray = this.state.allCounties;

    userArray.splice(index, 1);
    countyArray.push(name);
    this.inputText.value = '';
    filter.filterMine('');
    this.setState({
      allCounties: countyArray,
      userCounties: userArray
    });
  };


  change = () => {

    countyService.deleteSubscription();

    this.state.userCounties.map((e) => {
      let theBody: Object = {
        countyId: e.countyId
      };
      countyService.addSubscription(theBody);
    });
    window.location.reload();

  };


  getInformation = async () => {
    let counties = [];

    await userService.getCurrentUser()
      .then(resources => {
        let user = resources[0];
        this.setState({
          user: user
        });
      });

    await countyService.getAllCounties().then((r: Array<Object>) => {
      r.map(e => {
        if (!(e.countyId === this.state.user.countyId)) {
          counties.push(e);
        }
      });
      this.setState({
        allCounties: counties
      });
    });

    await countyService.getUsersCounties().then((r: Array<Object>) => {
      this.setState({
        userCounties: r
      });
    });

  };

  componentDidMount() {
    this.getInformation();
  }

  render() {
    return (
      <div className="countySubscription">
        <Grid>

          <Col md={2}>
          </Col>

          <Col md={8}>
            <Row>
              <Col xs={12} md={5}>
                <h5 align="center">Kommuner</h5>
                <FormControl
                  type="text"
                  id='allCounties'
                  onKeyUp={filter.filterAll}
                  placeholder="Søk i alle kommuner"
                  inputRef={input => this.inputText1 = input}
                />
                <ListGroup id={'allCountiesList'} style={{'max-height': 'calc(300px)', 'overflow-y': 'auto'}}>
                  {
                    this.state.allCounties.map((r, i) => {
                      return <li className="list-group-item" onClick={() => {
                        this.addCounty(r, i);
                      }} key={i}><a>{r.name}</a></li>;
                    })
                  }
                </ListGroup>
              </Col>

              <Col xs={12} md={2} align={'center'} className="arrows">

                <Row>
                  <span> <Glyphicon glyph="arrow-left"/></span>
                </Row>
                <Row>
                  <span> <Glyphicon glyph="arrow-right"/></span>
                </Row>

              </Col>

              <Col xs={12} md={5}>
                <h5 align="center">Mine Kommuner</h5>
                <FormControl
                  type="text"
                  id='myCounties'
                  onKeyUp={filter.filterMine}
                  placeholder="Søk i dine kommuner"
                  inputRef={input => this.inputText = input}
                />
                <ListGroup id="myCountiesList" style={{'max-height': 'calc(300px)', 'overflow-y': 'auto'}}>
                  {
                    this.state.userCounties.map((r, i) => {
                      return <li className="list-group-item" onClick={() => {
                        this.deleteCounty(r, i);
                      }} key={i}><a>{r.name}</a></li>;
                    })
                  }
                </ListGroup>
              </Col>
            </Row>

            <div align="right">
              <Button bsStyle="primary" onClick={() => this.change()}>Lagre endringer</Button>
            </div>
          </Col>

        </Grid>

      </div>

    );
  }
}
