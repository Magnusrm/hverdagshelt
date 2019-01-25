//@flow

import React from 'react';
import {Button, Col, Grid, Table, Tooltip, Row} from "react-bootstrap"
import {PageHeader} from "../../../components/PageHeader/PageHeader";
import {EventCategoryService, UserService} from "../../../services";
import {NavItem, Nav, FormControl} from "react-bootstrap";
import OverlayTrigger from "../adminIssues/adminIssues";
import update from 'immutability-helper';
import {history} from "../../../index";

let eventCategoryService = new EventCategoryService();
let userService = new UserService();

const toolTipEdit = (
    <Tooltip id="tooltip">
        Rediger hendelse
    </Tooltip>
);

const toolTipDelete = (
    <Tooltip id="tooltip">
        Slett hendelse
    </Tooltip>
);

export class adminEvents extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            events: [],
            selectedEvent: {},
            allEventCategories: [],
            edit: {}
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);
    }//end constructor


    render(){
        let showEvents;
        showEvents = this.state.events.map((event,i) => {
            if(this.state.edit === event.eventId){
                return(
                    <tr key={event.eventId} style={{background: 'white'}}>
                        <td>
                            <FormControl componentClass={"textarea"}
                            value={event.title}
                            onChange={this.handleTitleChange(i)}/>
                        </td>
                        <td>
                            <FormControl componentClass={"textarea"}
                            value={event.text}
                            onChange={this.handleTextChange(i)}/>
                        </td>
                        <td>
                            <FormControl onChange={this.handleCategoryChange(i)} componentClass={"select"} placeholder={"select"}
                            bsSize={""} style={{width: 100}}>
                                <option value={event.eventCategoryId}>{event.name}</option>
                                {this.state.allEventCategories.map(e => {
                                    if(event.eventCategoryId!==e.eventCategoryId)return <option value={e.eventCategoryId}>{e.name}</option>
                                })}
                            </FormControl>
                        </td>
                        <td>
                            {event.date}
                        </td>
                        <td>
                            {event.userMail}
                        </td>
                        <td>
                            <Col xs={6}>
                                <Button bsSize={"small"} bsStyle={"primary"} onClick={() => this.submitChanges(i)}>Lagre {' '}</Button>
                            </Col>
                            <Col md={6} align="right">
                                <Button bsSize={"default"} bsStyle={"link"} style={{color: 'black'}}
                                onClick={() => this.cancel()}> Avbryt</Button>
                            </Col>
                        </td>
                        <td></td>
                    </tr>
                )
            }else{
            return(
                <tr key={event.eventId}>
                    <td>
                        <Nav bsStyle="pills">
                            <NavItem href={'/#hendelse/' + event.eventId}>
                                {event.title}
                            </NavItem>
                        </Nav>
                    </td>
                    <td>
                        {event.text}
                    </td>
                    <td>
                        {event.name}
                    </td>
                    <td>
                        {event.date}
                    </td>
                    <td>
                        {event.userMail}
                    </td>
                    <td>
                      <Row>
                          <Col xs={6}>
                            <Button bsStyle="link"
                                    onClick={() => this.editEvent(event.eventId)}
                            type={"button"}>
                                <i className="glyphicon glyphicon-pencil"></i>
                            </Button>
                          </Col>
                          <Col md={6}>
                            <Button bsStyle="link" style={{color: 'darkred'}}
                                    onClick={() => this.deleteEvent(event)}
                            type={"button"}>
                                <span className="glyphicon glyphicon-trash"></span>
                            </Button>
                          </Col>
                      </Row>

                    </td>
                </tr>
            )
        }//end condition
        });

        return(
            <div>
                <i id="backButton"  onClick={()=> this.buttonBack()} className="fas fa-arrow-circle-left"></i>
                <Grid>
                    <PageHeader title={"Alle hendelser i " + window.sessionStorage.getItem('countyName')}/>
                    <Table>
                       <thead>
                            <tr>
                                <th>
                                    Tittel
                                </th>
                                <th>
                                   Beskrivelse
                                </th>
                                <th>
                                    Kategori
                                </th>
                                <th>
                                    Dato registrert
                                </th>
                                <th>
                                    Meldt inn av
                                </th>
                            </tr>
                       </thead>
                        <tbody>
                            {showEvents}
                        </tbody>
                    </Table>
                </Grid>
            </div>
        )
    }//end method

    componentWillMount() {
        userService.getCurrentUser().then(response => {
            if(response[0].typeName === "Private" || response[0].typeName===undefined){
                history.push('/');
            }
        }).catch((error: Error) => confirm(error.message));
        eventCategoryService.getAllEventsInOneCounty(window.sessionStorage.getItem('countyId')).then(response => {
            this.setState({events: response});
        }).catch((error: Error) => confirm(error.message));
        eventCategoryService.getEventCategory().then(response => {
            this.setState({allEventCategories: response});
        }).catch((error: Error) => confirm(error.message));
    }//end method

    editEvent(eventId: number){
        this.setState({edit: eventId});
    }//end method

    handleTitleChange = (index: number) => (event: Event) => {
       this.setState({events: update(this.state.events, {[index]: {title: {$set: event.target.value}}})})
    };

    handleTextChange = (index: number) => (event: Event) => {
        this.setState({events: update(this.state.events, {[index]: {text: {$set: event.target.value}}})})
    };

    handleCategoryChange = (index: number) => (event: Event) => {
        this.setState({events: update(this.state.events, {[index]: {eventCategoryId: {$set: event.target.value}}})})
    };

    deleteEvent(event: Object){
        if(confirm('Vil du slette hendelsen med tittel ' + event.title + '?')){
            eventCategoryService.deleteEvent(event.eventId).then(response => {
                window.location.reload();
            }).catch((error: Error) => confirm(error.message));
        }
    }//end method

    submitChanges(index: number){
        if(confirm('Vil du lagre dine endringer?'))eventCategoryService.updateEvent(this.state.events[index]).then(response => {
        }).catch((error: Error) => confirm(error.message));
        this.setState({edit: {}});
    }//end method

    cancel(){
        this.setState({edit: {}})
    }

    buttonBack(){
        this.props.history.goBack();
    }
}//end class