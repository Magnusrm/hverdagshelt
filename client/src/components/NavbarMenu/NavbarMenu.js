

import React from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
} from 'react-bootstrap';

let loginButton;

export class NavbarMenu extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
       if(window.localStorage.getItem('userToken') === ''){
            loginButton = <NavItem eventKey={1} href="/#login">Login</NavItem>
        }else{
           loginButton = <NavItem eventKey={1} href="/#login" onClick={() => this.logout()}> Log out</NavItem>
       }//end condition
        return (
            <Navbar collapseOnSelect fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/#">Hverdagshelt</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>

                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavDropdown title={"Min side"} id='1'>
                            <MenuItem eventKey={2} href="/#min_side/mine_saker">Mine saker</MenuItem>
                            <MenuItem eventKey={1} href="/#min_side/informasjon">Informasjon </MenuItem>
                            <MenuItem eventKey={1} href="/#min_side/kommuner">Kommuner</MenuItem>
                            <MenuItem eventKey={1} href="/#min_side/varselinstillinger">Varselinstillinger</MenuItem>
                        </NavDropdown>
                        {loginButton}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }//end method

    logout = () => {
        window.localStorage.setItem('userToken', '');
        loginButton = <NavItem eventKey={1} href="/#login">Login</NavItem>
    }//end method
}
