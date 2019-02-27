import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from './Form';

class AddElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            name: null,
            price: null
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
        //Тут должен быть ajax
    };

    render() {
        var buttonType = 'secondary';

        if(this.state.name !== null && this.state.price){
            buttonType = 'success';
        }
        return (
            <>
                <div className='form'>
                    <h2>Add new Product</h2>
                        <Form
                            plholder = ''
                            value = ''
                            type = 'text'
                            getElementName = {this.getElementName}
                        />
                        <Form
                            plholder = ''
                            value = ''
                            type = 'number'
                            getElementPrice = {this.getElementPrice}
                        />
                    <Button variant={buttonType}>Save</Button>
                </div>
            </>
        );
    }
}

export default AddElement;