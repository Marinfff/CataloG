import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import RendList from './Components/RendList'
import AddElement from './Components/AddElement'
import './style/App.css';

class App extends Component {
    state = {
        catalog: null,
        newElement: null,
        add: false,
        id: null
    };

    //Получения каталога из бд
    componentDidMount() {
        fetch(`./catalog.json`)
            .then(response => response.json())
            .then(data => this.setState({
                catalog: data
            }))
    }

    //Коллбэк для получения id удаленного элемента из RendList
    DeleteElement = (value) => {
        this.setState({
            id: value
        })
    };

    //Коллбэк для получения нового элемента из RendList
    AddElement = (value) => {
        this.setState({
            newElement: value
        })
    };

    setButton = () => {
        this.setState({
            add: !this.state.add
        });
    };

    render() {
        let
            value = 'Add new product',
            link = '/add',
            className = 'btn btn-success add',
            catalog = this.state.catalog;
        //Удаление элемента из массива
        if (this.state.id !== null) {
            catalog = catalog.splice(this.state.id, 1);
            this.setState({
                id: null
            });
        }
        //Добавление элемента в массив
        if (this.state.newElement !== null) {
            catalog.push(this.state.newElement);
            this.setState({
                newElement: null
            });
        }

        if (this.state.add) {
            value = 'Return';
            link = '/';
            className = 'btn btn-primary add';
        }

        if (this.state.catalog !== null) {
            return (
                <Router>
                    <>
                        <Route exact path='/' render={(props) => (
                            <RendList {...props}
                                      newElement = {this.state.newElement}
                                      catalog = {catalog}
                                      DeleteElement = {this.DeleteElement}
                            />
                        )}/>
                        <Route exact path='/add' render={(props) => (
                            <AddElement {...props}
                                        AddElement = {this.AddElement}
                                        id = {catalog.length}
                            />
                        )}/>
                        <Link to = {link} className = {className} onClick = {this.setButton}>{value}</Link>
                    </>
                </Router>
            );
        }else{
            return(
                <></>
            );
        }
    }
}

export default App;