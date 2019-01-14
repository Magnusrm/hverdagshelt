import {Component} from "react";
import {getCompanyIssue} from "../services";
import {ListGroupItem} from "react-bootstrap";
import React from "react";




export class companyIssues extends Component<Props,State>{

    state = {
        issues: [],
    };

    getIssues = async ()=>{
        let id:string = this.props.match.params.companyMail;
        await getCompanyIssue(id).then((r: Array<Object>) => {
            this.setState({
                issues: r
            });
            console.log(this.state.issues);
        });


    };

    componentDidMount() {
        this.getIssues();
    }

    render() {
        return (
            <Container>
                <ListGroup>
                    {
                        this.state.issues.map((r,i)=>{
                            return <ListGroupItem onClick={()=>{this.state.map(r,i)}} key={i}>{r.name}</ListGroupItem>
                        })
                    }
                </ListGroup>
            </Container>
        )
    }
}