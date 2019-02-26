import React, {Component} from 'react';
import Element from './Element'
import Button from 'react-bootstrap/Button';

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
            if (direction === 1) {
                catalog.sort(function (a, b) {
                    let nameA,nameB;
                    if(direction === 1){
                        nameA = a[value].toLowerCase();
                        nameB = b[value].toLowerCase();
                    }else if(direction === -1){
                        nameA = b[value].toLowerCase();
                        nameB = a[value].toLowerCase();
                    }
                    if (nameA < nameB)
                        return -1;
                    if (nameA > nameB)
                        return 1;
                    return 0;
                })
            }
        };

        let setStates = (v, v2, v3, v4) => {
            this.setState({
                sortId: v,
                sortName: v2,
                sortPrice: v3,
                sortData: v4
            })
        };

        let setStateItem = (value, value1, direction, item) => {
            switch (item) {
                case null:
                    value();
                    break;
                case direction:
                    value1();
                    break;
                case -direction:
                    value();
                    break;
            }
            sorttt(sortId, 'id');
            sortttt(sortName, 'name');
            sorttt(sortPrice, 'price');
            sorttt(sortData, 'data');
        };

        let sorttt = (value, value1) =>{
            if (value === 1) {
                sortNumber(value1, 1);
                arrow = arrow1;
            } else if (value === -1) {
                sortNumber(value1, -1);
                arrow = arrow2;
            }
        };

        let sortttt = (value, value1) =>{
            if (value === 1) {
                sortString(value1, 1);
                arrow = arrow1;
            } else if (value === -1) {
                sortString(value1, -1);
                arrow = arrow2;
            }
        };

        let sortItems = (v,v2,v3,v4, v5)=> {
            setStateItem(() => {
                setStates(v, v2, v3, v4);
            }, () => {
                setStates(-v, -v2, -v3, -v4);
            }, 1, v5);
        }
        //Обработчики кнопок сортировки
        let sortIdd = () => {
            sortItems(1, null, null, null, sortId);
        };

        let SortName = () => {
            sortItems(null, 1, null, null , sortName);
        };

        let SortPrice = () => {
            sortItems(null, null, 1, null, sortPrice);
        };

        let SortData = () => {
            sortItems(null, null, null, 1, sortData);
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
                        <Button variant="light" onClick={sortIdd}>id {arrow}</Button>
                        <Button variant="light" onClick={SortName}>Name {arrow}</Button>
                        <Button variant="light" onClick={SortPrice}>Price {arrow}</Button>
                        <Button variant="light" onClick={SortData}> Data {arrow}</Button>
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