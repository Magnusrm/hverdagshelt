import ReactDOM from "react-dom";
import * as React from "react";
import {Component} from "react-simplified";
import {ButtonToolbar, ToggleButtonGroup, ToggleButton, Collapse, Button} from "react-bootstrap";
import {CategoryService} from "../../services";
import {Category, Category2, Category3} from "../../classTypes";
import PanelGroup from "react-bootstrap/es/PanelGroup";
import Panel from "react-bootstrap/es/Panel";
import ListGroup from "react-bootstrap/es/ListGroup";
import ListGroupItem from "react-bootstrap/es/ListGroupItem";
import cloneDeep from 'lodash/cloneDeep';

let categoryService = new CategoryService();

export class ChooseCategory extends Component<{registerCategory ?: boolean}> {


    /*

        To get the selected category

     */


    constructor(props) {
        super(props);
        this.state = {
            category1: [],
            category2: [],
            category3: [],
            selectedCategory: {name: 'ingen'},
            selectedCategoryType: 0,
            selectedCategoryId: -1,
            newCategoryHeader:'Den nye overkategorien'
        };

        this.handleClick = this.handleClick.bind(this)
    }

    //used in adminAddCategory to get the chosen category header
    //Finn ut hva som skal tas imot fra den andre
    onChangeCategoryHeader=()=>{
        this.props.changeCategoryHeader(this.state.selectedCategoryId, this.state.selectedCategoryType);
    };

    getSelectedCategoryId() {
        return this.state.selectedCategoryId;
    }

    getSelectedCategoryType() {
        return this.state.selectedCategoryType;
    }

    getSelectedCategoryName() {
        return this.state.selectedCategory;
    }

    componentDidMount() {
        let kat1 = [];
        let kat2 = [];
        let kat3 = [];

        categoryService.getCategory1().then(resources => {

            resources.map(r => {
                let elem: Category = {
                    name: r.name,
                    id: r.categoryId,
                    priority: r.priority,
                    active: r.active,
                    open: false
                };
                kat1 = kat1.concat(elem);
            });

            this.setState({
                category1: kat1
            });

        });

        categoryService.getCategory2().then(resources => {

            resources.map(r => {
                let elem: Category2 = {
                    name: r.name,
                    id: r.category2Id,
                    idUp: r.categoryId,
                    priority: r.priority,
                    active: r.active,
                    open: false
                };
                kat2 = kat2.concat(elem);
            });

            console.log('kat2', kat2);
            this.setState({
                category2: kat2
            });
        });
        if (!this.props.registerCategory) {
            categoryService.getCategory3().then(resources => {

                resources.map(r => {
                    let elem: Category3 = {
                        name: r.name,
                        id: r.category3Id,
                        idUp: r.category2Id,
                        priority: r.priority,
                        active: r.active,
                    };
                    kat3 = kat3.concat(elem);
                });

                this.setState({
                    category3: kat3
                });
            });

        }
    }

    handleClick(cat1: Category) {

        let arr = cloneDeep(this.state.category1);

        let objectIndex = this.state.category1.indexOf(cat1);

        arr.map(e => {
            e.open = false;
        });

        arr[objectIndex].open = !this.state.category1[objectIndex].open;

        this.state.category1[objectIndex].open = !this.state.category1[objectIndex].open;

        this.setState({
            category1: arr,
            selectedCategory: cat1,
            selectedCategoryType: this.getCategoryType(cat1),
            selectedCategoryId: cat1.id
        })
        this.onChangeCategoryHeader()
    }

    handleClick2(cat2: Category2) {

        const arr = cloneDeep(this.state.category2);

        let objectIndex = this.state.category2.indexOf(cat2);

        arr[objectIndex].open = !this.state.category2[objectIndex].open;

        arr.map(e => {
            e.open = false;
        });

        arr[objectIndex].open = !this.state.category2[objectIndex].open;

        this.setState({
            category2: arr,
            selectedCategory: cat2,
            selectedCategoryType: this.getCategoryType(cat2),
            selectedCategoryId: cat2.id
        })
        this.onChangeCategoryHeader()

    }


    handleClick3(cat3: Category3) {

        console.log('cat3Id:', cat3);

        this.setState({
            selectedCategory: cat3,
            selectedCategoryType: this.getCategoryType(cat3),
            selectedCategoryId: cat3.id
        })
        this.onChangeCategoryHeader()
    }

    getCategoryType(category) {

        let returnValue = "0";

        console.log('nameInGetCategoryType:', category.name)

        this.state.category1.map(cat1 => {
            if (cat1.name == category.name) {
                returnValue = "1";
            }
        });


        this.state.category2.map(cat2 => {
            if (cat2.name == category.name) {
                returnValue = "2";
            }
        });

        this.state.category3.map(cat3 => {
            if (cat3.name == category.name) {
                returnValue = "3";
            }
        });

        console.log('returnvalue:', returnValue);
        return returnValue;
    }


    render() {

        return (
            <div>
                <ListGroup>
                    {this.state.category1.map(cat1 => {
                        return (
                            <div key={cat1.id}>
                                <ListGroupItem onClick={() => this.handleClick(cat1)}>cat1: {cat1.name}</ListGroupItem>

                                <Collapse in={cat1.open}>
                                    <div>
                                        {this.state.category2.map(cat2 => {
                                            if (cat2.idUp == cat1.id) {
                                                return (<div key={cat2.id}>
                                                    <ListGroupItem
                                                        onClick={() => this.handleClick2(cat2)}>___cat2: {cat2.name}</ListGroupItem>


                                                    <Collapse in={cat2.open}>
                                                        <div>
                                                            {this.state.category3.map(cat3 => {
                                                                if (cat3.idUp == cat2.id) {
                                                                    return (<div key={cat3.id}>
                                                                        <ListGroupItem
                                                                            onClick={() => this.handleClick3(cat3)}>______cat3: {cat3.name}</ListGroupItem>

                                                                    </div>)
                                                                }
                                                            })}
                                                        </div>
                                                    </Collapse>

                                                </div>)
                                            }
                                        })}
                                    </div>
                                </Collapse>

                            </div>)
                    })}
                </ListGroup>
            </div>
        );
    }

}
