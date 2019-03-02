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
    deleteElement = (value) => {
        this.setState({
            id: value
        })
    };

    //Коллбэк для получения нового элемента из RendList
    addElement = (value) => {
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
        let catalog = this.state.catalog;
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

        if (this.state.catalog !== null) {
            return (
                <Router>
                    <>
                        <Route exact path='/' render={(props) => (
                            <RendList {...props}
                                      newElement = {this.state.newElement}
                                      catalog = {catalog}
                                      deleteElement = {this.deleteElement}
                            />
                        )}/>
                        <Route exact path='/add' render={(props) => (
                            <AddElement {...props}
                                        addElement = {this.addElement}
                                        id = {catalog.length}
                            />
                        )}/>

                        {(this.state.add)
                            ? <Link to = '/' className = "btn btn-primary add"
                                    onClick = {this.setButton}>Return</Link>
                            : <Link to = '/add' className = "btn btn-success add"
                                    onClick = {this.setButton}>Add new product</Link>
                        }
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