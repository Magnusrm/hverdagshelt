import * as React from "react";
import DropdownButton from "react-bootstrap/es/DropdownButton";
import FormControl from "react-bootstrap/es/FormControl";
import {Component} from "react"


export class CustomSearchDrop extends Component {
    constructor(props,context){
        super(props, context);

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: ''
        };
    }

    handleClick(e) {
        e.preventDefault();

        this.props.onClick(e);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    focusNext() {
        const input = ReactDOM.findDOMNode(this.input);

        if (input) {
            input.focus();
        }
    }

    render() {
        const { children } = this.props;
        const { value } = this.state;
        return (
            <FormControl id={"clicker"} title={"Søkeboks"} placeholder={"Søk her"} onClick={this.handleClick} ref={c => {
                this.input = c;
            }}
                         type="text"
                         placeholder="Søk her"
                         onChange={this.handleChange}
                         value={value}>
                {this.props.children}
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        child => !value.trim() || child.props.children.indexOf(value) !== -1
                    )}
                </ul>
            </FormControl>

        );
    }




}







export class CustomToggle extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: ''
        };
    }

    handleClick(e) {
        e.preventDefault();

        this.props.onClick(e);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    focusNext() {
        const input = ReactDOM.findDOMNode(this.input);

        if (input) {
            input.focus();
        }
    }

    render() {
        const { children } = this.props;
        const { value } = this.state;
        return (
            <FormControl id={"clicker"} title={"Søkeboks"} placeholder={"Søk her"} onClick={this.handleClick} ref={c => {
                this.input = c;
            }}
                         type="text"
                         placeholder="Søk her"
                         onChange={this.handleChange}
                         value={value}>
                {this.props.children}
            </FormControl>

        );
    }
}

export class CustomMenu extends React.Component {
    constructor(props, context) {
        super(props, context);


        this.state = {
            value: ''
        };
    }



    render() {
        const { children } = this.props;
        const { value } = this.state;

        return (
            <div className="dropdown-menu" style={{ padding: '' }}>

                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        child => !value.trim() || child.props.children.indexOf(value) !== -1
                    )}
                </ul>
            </div>
        );
    }
}