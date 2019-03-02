import React, {Component} from 'react';
import Element from './Element';
import Button from 'react-bootstrap/Button';

class RendList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortId: false,
            sortName: false,
            sortPrice: false,
            sortData: false,
            term: ''
        };
    }

//Коллбэк для получения id удаленного элемента из Element
    getIdForDelete = (value) => {
        this.props.deleteElement(value);
    };

//Обработчик формы поиска
    searchHandler = (e) => {
        this.setState({
            term: e.target.value
        });
    };

    render() {
        let catalog = this.props.catalog;
        let term = this.state.term;
        //Функция для сортировки чисел и даты
        let sortNumber = (direction, value) => {
            catalog.sort((b, a) => {
                let first = a;
                let second = b;
                if(!direction){
                    first = b;
                    second = a;
                }
                if (value === 'data')
                    return new Date(first.data.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1')) -
                        new Date(second.data.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));

                    return first[value] - second[value];
            })
        };

        //Функция для сортировки строк
        let sortString = (direction, value) => {
            catalog.sort((a, b) => {
                let
                    nameA = a[value].toLowerCase(),
                    nameB = b[value].toLowerCase();
                if (direction) {
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

        //Функция для изменения стейтов и вызова фунуции сортировки
        let setStates = (value, direction) => {
            let obj;
            switch (value) {
                case 'id' :
                    obj = {
                        sortId: !direction
                    };
                    break;
                case 'name' :
                    obj = {
                        sortName: !direction
                    };
                    break;
                case 'price' :
                    obj = {
                        sortPrice: !direction
                    };
                    break;
                case 'data' :
                    obj = {
                        sortData: !direction
                    };
                    break;
            }

            this.setState(obj);

            if (value === 'name') {
                sortString(direction, value);
            } else {
                sortNumber(direction, value);
            }
        };

        //Обработчик кнопок сортировки
        let Sort = (e) => {
            setStates(e.target.id, this.state[e.target.name]);
        };

        //Функция поиска по name, price и data
        let searchingFor = (term) => {
            return (value) => {
                return value.name.toLowerCase().includes(term.toLowerCase()) ||
                    value.price.includes(term) ||
                    value.data.includes(term) ;
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
                        <Button variant="light" id='id' name='sortId' onClick={Sort}>id </Button>
                        <Button variant="light" id='name' name='sortName' onClick={Sort}>Name</Button>
                        <Button variant="light" id='price' name='sortPrice' onClick={Sort}>Price </Button>
                        <Button variant="light" id='data' name='sortData' onClick={Sort}> Data</Button>
                        <div>Action</div>
                    </div>
                </header>
                <main>
                    {catalog.filter(searchingFor(term)).map((value, index) => {
                        return (
                            <Element
                                value={value}
                                index={index}
                                getIdForDelete={this.getIdForDelete}
                            />
                        );
                    })}
                </main>
            </div>
        );
    }
}

export default RendList;