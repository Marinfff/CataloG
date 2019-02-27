import React, {Component} from 'react';

let alerts = {
    'inValidName': <div className="alert alert-danger" role="alert">
        Name is invalid ! Minimum 3 characters!
    </div>,
    'inValidPrice': <div className="alert alert-danger" role="alert">
        Price is invalid ! Minimum 1 character! Numbers only!
    </div>
};

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null
        };
    }

    //Методы для валидации форм
    handleChangeName = (e) => {
        let value = e.target.value;
        if (value.match("^[a-zA-Z 1-9 ., -]*$") != null && value.length >= 3) {
            this.props.getElementName(value);
            this.setState({
                alert: null
            });
        } else {
            this.props.getElementName(null);
            this.setState({
                alert: alerts.inValidName
            });
        }
    };

    handleChangePrice = (e) => {
        let value = e.target.value;
        if (value.match("^[0-9 .]*$") != null && value.length >= 1) {
            this.props.getElementPrice(value);
            this.setState({
                alert: null
            });
        } else {
            this.props.getElementPrice(null);
            this.setState({
                alert: alerts.inValidPrice
            });
        }
    };

    render() {
        let type = this.props.type;
        let defaultValue = this.state.value;
        let placeHolder = this.props.plholder;

        if (type === 'text') {
            return (
                <>
                    <div>
                        <div className="form-group">
                            <input className="form-control"
                                   defaultValue={defaultValue}
                                   placeholder={placeHolder}
                                   onChange={this.handleChangeName}
                            />
                        </div>
                        {this.state.alert}
                    </div>
                </>
            );
        } else if (type === 'number') {
            return (
                <div>
                    <div className="form-group">
                        <input className="form-control"
                               defaultValue={defaultValue}
                               placeholder={placeHolder}
                               onChange={this.handleChangePrice}
                        />
                    </div>
                    {this.state.alert}
                </div>
            );
        }
    }
}

export default Form;