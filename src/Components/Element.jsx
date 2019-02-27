import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

class Element extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            alert: false,
            alertType: "",
            show: false
        };
    }

//Обработчики кликов
    handleClose = () => {
        this.setState({show: false});
    };

    handleShow = () => {
        this.setState({show: true});
    };

    setUpdateState = () => {
        this.setState({
            edit: true
        });
    };

    deleteElement = () => {
        let elementId = this.props.index;

        this.setState({
            show: false
        });

        //Тут должен быть ajax )
        this.props.getDeleteId(elementId);
    };

    saveUpdate = () => {
        let
            newName = this.refs.updateName.value,
            newPrice = this.refs.updatePrice.value,
            value = this.props.value;
        //Проверка форм на валидность
        if (
            newName.match("^[a-zA-Z 1-9 ., -]*$") != null && newName.length >= 3
            &&
            newPrice.match("^[0-9 .]*$") != null && newPrice.length >= 1
        ) {

            //Тут тоже должен быть ajax )

            value.name = newName;
            value.price = newPrice;
            //Алерт для успешной операции
            this.setState({
                alert: true,
                alertType: "success",
                edit: false
            });

            setTimeout(() => {
                this.setState({
                    alert: false,
                });
            }, 1200);
            //Алерт для ошибки валидации
        } else {
            this.setState({
                alert: true,
                alertType: "errValidation"
            });

            setTimeout(() => {
                this.setState({
                    alert: false,
                });
            }, 1300);
        }
    };

    cancelEdit = () => {
        this.setState({
            edit: false
        });
    };

    render() {
        let
            value = this.props.value,
            alert;

        let
            success = <Alert variant="success">Saved !</Alert>,
            error = <Alert variant="danger">Error !</Alert>,
            inValidForm = <Alert variant="danger">Name or price is invalid! Minimum 3 characters! <br/>
                Only number for price!</Alert>;
        //Отрисовываем алерт в зависимости от кода ошибки
        if (this.state.alert)
            switch (this.state.alertType) {
                case 'succes':
                    alert = success;
                    break;
                case 'error':
                    alert = error;
                    break;
                case 'errValidation':
                    alert = inValidForm;
                    break;
            }

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

                    <Modal show={this.state.show} onHide={this.handleClose}>
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

                    {alert}
                </div>
            );
        } else {
            return (
                //Состояние редактирования
                <div key={value.id} className="line">

                    <div>{value.id}</div>
                    <input className="input form-control" ref="updateName" defaultValue={value.name}/>
                    <input className="input form-control" ref="updatePrice" defaultValue={value.price}/>
                    <div>{value.data}</div>

                    <Button variant="warning" onClick={this.saveUpdate}>Save</Button>
                    <Button variant="danger" onClick={this.cancelEdit}>Cancel</Button>

                    {alert}
                </div>
            );
        }
    }
}

export default Element;