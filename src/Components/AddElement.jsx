import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

class AddElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            name: "",
            price: "",

            alert: false,
            alertType: "",

            nameIsValid: false,
            priceIsValid: false
        };
    }

    componentDidMount() {
        let
            data = new Date(),
            dd = data.getDate(),
            mm = data.getMonth() + 1,
            yyyy = data.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        data = dd + '.' + mm + '.' + yyyy;

         this.setState({
            data : data
        });
    }

    saveNewElement = () => {
        //Получаем данные из форм
        let
            data = this.state.data,
            id = this.props.id + 1,
            name = this.state.name,
            price = this.state.price;

        let arr = {
            "id": id,
            "name": name,
            "price": price,
            "data": data
        };
        //Проверяем валидны ли формы перед сохранением
        if (
            this.state.nameIsValid &&
            this.state.priceIsValid &&
            name !== '' && price !== ''
        ) {
            //Тут должен быть ajax )

            this.props.AddElement(arr);
            //Алерт для успешной операции
            this.setState({
                alert: true,
                alertType: "success"
            });

            setTimeout(() => {
                this.setState({
                    alert: false,
                });
            }, 1200);
//Алерты для ошибок валидации
        } else if (!this.state.nameIsValid) {
            this.setState({
                alert: true,
                alertType: "nisv"
            });
        } else if (!this.state.PriceIsValid) {
            this.setState({
                alert: true,
                alertType: "pisv"
            });
        }

    };

    //Методы для валидации форм
    handleChangeName = (e) => {
        let value = e.target.value;
        if (value.match("^[a-zA-Z 1-9 ., -]*$") != null && value.length >= 3) {
            this.setState({
                name: value,
                nameIsValid: true,
                alert: false
            });
        } else {
            this.setState({
                nameIsValid: false,
                alert: true,
                alertType: "nisv"
            });
        }
    };

    handleChangePrice = (e) => {
        let value = e.target.value;
        if (value.match("^[0-9 .]*$") != null && value.length >= 1) {
            this.setState({
                price: value,
                priceIsValid: true,
                alert: false
            });
        } else {
            this.setState({
                priceIsValid: false,
                alert: true,
                alertType: "pisv"
            });
        }
    };


    render() {
        let
            alert,
            alertName,
            alertPrice;

        let
            buttonType = "secondary",
            success = <Alert variant="success">Saved !</Alert>,
            error = <Alert variant="danger">Error !</Alert>,
            inValidName = <Alert variant="danger">Name is invalid! Minimum 3 characters!</Alert>,
            inValidPrice = <Alert variant="danger">Price is invalid! Minimum 1 characters! Only number!</Alert>;

        //Отрисовываем алерт и цвет кнопки в зависимости от кода ошибки
        if (this.state.alert)
            switch (this.state.alertType) {
                case 'success':
                    alert = success;
                    break;
                case 'error':
                    alert = error;
                    break;
                case 'nisv':
                    alertName = inValidName;
                    buttonType = 'secondary';
                    break;
                case 'pisv':
                    alertPrice = inValidPrice;
                    buttonType = 'secondary';
                    break;
            }


        if (this.state.nameIsValid && this.state.priceIsValid) {
            buttonType = "warning";
        }

        return (
            <>
                <div className='form'>
                    <h2>Add new Product</h2>
                    <div className="form-group">
                        <input
                            ref="updateName"
                            type="text"
                            onChange={this.handleChangeName}
                            className="form-control"
                            placeholder="Enter name"
                        />
                        {alertName}
                    </div>

                    <div className="form-group">
                        <input
                            ref="updatePrice"
                            type="text"
                            className="form-control"
                            placeholder="Enter price"
                            onChange={this.handleChangePrice}
                        />
                        {alertPrice}
                    </div>
                    <Button variant={buttonType} className="save" onClick={this.saveNewElement}>Save</Button>
                </div>
                {alert}
            </>
        );
    }
}

export default AddElement;