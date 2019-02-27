import React, {Component} from 'react';
import Element from './Element'
import Button from 'react-bootstrap/Button';
import {forEach} from "react-bootstrap/es/utils/ElementChildren";

class RendList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortId: null,
            sortName: null,
            sortPrice: null,
            sortData: null,
            term: ''
        };
    }

//Коллбэк для получения id удаленного элемента из Element
    GetIdForDelete = (value) => {
        this.props.DeleteElement(value);
    };

//Обработчик формы поиска
    searchHandler = (e) => {
        this.setState({
            term: e.target.value
        });
    };

    render() {
        let
            sortId = this.state.sortId,
            sortName = this.state.sortName,
            sortPrice = this.state.sortPrice,
            sortData = this.state.sortData;
        let
            catalog = this.props.catalog,
            arrow1 = '↑',
            arrow2 = '↓',
            arrow;
        //Функция для сортировки чисел и даты
        let sortNumber = (value, direction) => {
                catalog.sort(function (b, a) {
                    if (value === 'data') {
                        if(direction === 1){
                            return new Date(a.data.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1')) -
                                new Date(b.data.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
                        }else{
                            return new Date(b.data.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1')) -
                                new Date(a.data.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
                        }
                    } else {
                        if(direction === 1){
                            return a[value] - b[value];
                        }else if(direction === -1){
                            return b[value] - a[value];
                        }
                    }
                })
            };


        //Функция для сортировки строк
        let sortString = (value, direction) => {
                catalog.sort(function (a, b) {
                    let
                        nameA = a[value].toLowerCase(),
                        nameB = b[value].toLowerCase();
                    if(direction === -1){
                        nameA = b[value].toLowerCase();
                        nameB = a[value].toLowerCase();
                    }
                    if (nameA < nameB)
                        return -1;
                    if (nameA > nameB)
                        return 1;
                    return 0;
                })
        };

        //item, value
        let setStates = (item, value) => {
            let obj = {};
            obj[item] = value;
            forEach()
            this.setState(obj);
        };

        let setStateItem = (value, value1, direction, item) => {
            switch (item) {
                case -null:
                    value();
                    break;
                case null:
                    value1();
                    break;
                case direction:
                    value1();
                    break;
                case -direction:
                    value();
                    break;
            }
            console.log(item);
            getSortNum(sortId, 'id');
            getSortStr(sortName, 'name');
            getSortNum(sortPrice, 'price');
            getSortNum(sortData, 'data');
        };

        let getSortNum = (value, value1) =>{
            if (value === 1) {
                sortNumber(value1, 1);
                arrow = arrow1;
            } else if (value === -1) {
                sortNumber(value1, -1);
                arrow = arrow2;
            }
        };

        let getSortStr = (value, value1) =>{
            if (value === 1) {
                sortString(value1, 1);
                arrow = arrow1;
            } else if (value === -1) {
                sortString(value1, -1);
                arrow = arrow2;
            }
        };

        //Обработчики кнопок сортировки
        let Sort = (e) => {
            setStates(e.target.name, 1);
        };

        let term = this.state.term;
        //Функция поиска по name, price и data
        let searchingFor = (term) => {
            return (value) => {
                return value.name.toLowerCase().includes(term.toLowerCase()) ||
                    value.price.includes(term) ||
                    value.data.includes(term);
            }
        };


        return (
            <div className="App">
                <header>
                    <div className="form-group search">
                        <input
                            type="text" className="form-control"
                            onChange={this.searchHandler} value={term}
                            placeholder="Search"
                        />
                    </div>
                    <div className="first">
                        <Button variant="light" name="id" onClick={Sort}>id {arrow}</Button>
                        <Button variant="light" name="name" onClick={Sort}>Name {arrow}</Button>
                        <Button variant="light" name="price" onClick={Sort}>Price {arrow}</Button>
                        <Button variant="light" name="data" onClick={Sort}> Data {arrow}</Button>
                        <div>Action</div>
                    </div>
                </header>
                <main>
                    {catalog.filter(searchingFor(term)).map((value, index) => {
                        return (
                            <Element
                                value={value}
                                index={index}
                                GetIdForDelete={this.GetIdForDelete}
                            />
                        );
                    })}
                </main>
            </div>
        );
    }
}

export default RendList;