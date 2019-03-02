import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from "./Form";

class Element extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            price: null,
            edit: false,
            alerts: null,
            showModal: false
        };
    }

    componentDidMount() {
        fetch(`./alerts.json`)
            .then(response => response.json())
            .then(json => this.setState({
                alerts: json
            }));
    }

//Обработчики кликов
    handleClose = () => {
        this.setState({showModal: false});
    };

    handleShow = () => {
        this.setState({showModal: true});
    };

    getElementName = (value) => {
        this.setState({
            name: value
        })
    };

    getElementPrice = (value) => {
        this.setState({
            price: value
        })
    };

    setUpdateState = () => {
        this.setState({
            edit: true
        });
    };

    deleteElement = () => {
        let elementId = this.props.index;
        //Тут должен быть ajax )
        this.props.getIdForDelete(elementId);
        this.setState({
            showModal: false
        });
    };

    saveUpdate = () => {
        let
            newName = this.state.name,
            newPrice = this.state.price,
            value = this.props.value;
        //Проверка форм на валидность
        value.name = newName;
        value.price = newPrice;

        this.setState({
            edit: false
        })
    };

    cancelEdit = () => {
        this.setState({
            edit: false
        });
    };

    render() {
        let value = this.props.value;
        //Проверяем текущее состояние компонента
        if (!this.state.edit) {
            //Обычное состояние
            return (
                <div key={value.id} className="line">
                    <div>{value.id}</div>
                    <div>{value.name}</div>
                    <div>{value.price}</div>
                    <div>{value.data}</div>

                    <Button variant="warning" onClick={this.setUpdateState}>Update</Button>
                    <Button variant="danger" onClick={this.handleShow}>Delete</Button>

                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this item?<br/>
                            Id: {value.id},
                            Name: {value.name},
                            Price: {value.price},
                            Data: {value.data}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="danger" onClick={this.deleteElement}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        } else {
            return (
                //Состояние редактирования
                <div key={value.id} className="line">

                    <div>{value.id}</div>
                    <Form
                        plholder=''
                        value={value.name}
                        type='text'
                        getElementName={this.getElementName}
                        alerts={this.state.alerts}
                    />
                    <Form
                        plholder=''
                        value={value.price}
                        type='number'
                        getElementPrice={this.getElementPrice}
                        alerts={this.state.alerts}
                    />
                    <div>{value.data}</div>

                    {(this.state.name !== null && this.state.price !== null)
                        ? <Button variant='outline-success'
                                  onClick={this.saveUpdate}>Save</Button>
                        : <Button variant='outline-success'
                                  onClick={this.saveUpdate} disabled>Save</Button>
                    }
                    <Button variant="outline-danger" onClick={this.cancelEdit}>Cancel</Button>
                </div>
            );
        }
    }
}

export default Element;