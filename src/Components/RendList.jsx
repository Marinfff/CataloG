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

        this.searchHandler = this.searchHandler.bind(this);
    }

//Коллбэк для получения id удаленного элемента из Element
    GetDeleteId = (value) => {
        this.props.DeleteElement(value);
    };

//Обработчик формы поиска
    searchHandler = (e) =>{
        this.setState({
            term: e.target.value
        });
    }

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
        var sortNumber = (value, direction) => {
            if (direction == 1) {
                catalog.sort(function (a, b) {
                    if (value == 'data') {
                        return new Date(a.data.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1')) -
                            new Date(b.data.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
                    } else {
                        return a[value] - b[value];
                    }
                })
            } else if (direction == -1) {
                catalog.sort(function (b, a) {
                    if (value == 'data') {
                        return new Date(a.data.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1')) -
                            new Date(b.data.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
                    } else {
                        return a[value] - b[value];
                    }
                })
            }

        };
        //Функция для сортировки строк
        var sortString = (value, direction) => {
            if (direction == 1) {
                catalog.sort(function (a, b) {
                    let
                        nameA = a[value].toLowerCase(),
                        nameB = b[value].toLowerCase();
                    if (nameA < nameB)
                        return -1;
                    if (nameA > nameB)
                        return 1;
                    return 0;
                })
            } else if (direction == -1) {
                catalog.sort(function (b, a) {
                    let
                        nameA = a.name.toLowerCase(),
                        nameB = b.name.toLowerCase();
                    if (nameA < nameB)
                        return -1;
                    if (nameA > nameB)
                        return 1;
                    return 0;
                })
            }
        };

        var setId = (value) => {
             this.setState({
                sortId: value
            })
            console.log(value);
        };
        var setName = (value) => {
            this.setState({
                sortName: value
            })
            console.log(value);
        };
        var setPrice = (value) => {
            this.setState({
                sortPrice: value
            })
            console.log(value);
        };
        var setData = (value) => {
            this.setState({
                sortData: value
            })
            console.log(value);
        };

        var resetState = (value, value2, value3 , value4)=>{
            this.setState({
                sortId: value,
                sortName : value2,
                sortPrice : value3,
                sortData : value4
            })
        }

        var setStateItem = (value, value1, direction, item)=> {
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
        }

        //Обработчики кнопок сортировки

        var sortIdd = ()=>{
            resetState(2, null, null, null);
            let direction = 1;
            setStateItem(() => {
                setId(direction)
            },() => {
                setId(-direction)
            }, direction, sortId);
        }

        var SortName = () => {
            resetState(null, 2, null, null);
            let direction = 1;
            setStateItem(() => {
                setName(direction)
            },() => {
                setName(-direction)
            }, direction, sortName);
        };

        var SortPrice = () => {
            resetState(null, null, 2, null);
            let direction = 1;
            setStateItem(() => {
                setPrice(direction)
            },() => {
                setPrice(-direction)
            }, direction, sortPrice);
        };

        var SortData = () => {
            resetState(null, null, null, 2);
            let direction = 1;
            setStateItem(() => {
                setData(direction)
            },() => {
                setData(-direction)
            }, direction, sortData);
        };

        //Вызываем функции сортировки в зависимости от состояния кнопок
        if (sortId == 1) {
            sortNumber('id', 1);
            arrow = arrow1;
        } else if (sortId == -1) {
            sortNumber('id', -1);
            arrow = arrow2;
        } else if (sortPrice == 1) {
            sortNumber('price', 1);
            arrow = arrow1;
        } else if (sortPrice == -1) {
            sortNumber('price', -1);
            arrow = arrow2;
        } else if (sortName == 1) {
            sortString('name', 1);
            arrow = arrow1;
        } else if (sortName == -1) {
            sortString('name', -1);
            arrow = arrow2;
        } else if (sortData == 1) {
            sortNumber('data', 1);
            arrow = arrow1;
        } else if (sortData == -1) {
            sortNumber('data', -1);
            arrow = arrow2;
        }

        let term = this.state.term;
        //Функция поиска по nama, price и data
        var searchingFor = (term) => {
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
                        <input type="text" className="form-control" onChange={this.searchHandler} value={term}
                               placeholder="Search"/>
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
                                GetDeleteId={this.GetDeleteId}
                            />
                        );
                    })}
                </main>
            </div>
        );
    }
}

export default RendList;