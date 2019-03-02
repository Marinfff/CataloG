import React, {Component} from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null
        };
    }

    formValidator = (value, type) => {
        let alert = this.props.alerts;
        if (type === "text") {
            if (value.length < 3) {
                this.props.getElementName(null);
                this.setState({
                    alert: alert.name.enpty
                });
            } else {
                if (value.match("^[a-zA-Z 1-9 ., -]*$") != null) {
                    this.props.getElementName(value);
                    this.setState({
                        alert: null
                    });
                } else {
                    this.props.getElementName(null);
                    this.setState({
                        alert: alert.name.format
                    });
                }
            }
        } else if (type === "number") {
            if (value.length < 1) {
                this.props.getElementPrice(null);
                this.setState({
                    alert: alert.price.enpty
                });
            } else {
                if (value.match("^[0-9 .]*$") != null) {
                    this.props.getElementPrice(value);
                    this.setState({
                        alert: null
                    });
                } else {
                    this.props.getElementPrice(null);
                    this.setState({
                        alert: alert.price.format
                    });
                }
            }
        }
    };

    //Методы для валидации форм
    handleChangeForm = (e) => {
        this.formValidator(e.target.value, this.props.type);
    };

    render() {
        let type = this.props.type;
        let defaultValue = this.props.value;
        let placeHolder = this.props.plholder;

        if (type === 'text') {
            return (
                <>
                    <div>
                        <div className="form-group">
                            <input className="form-control"
                                   defaultValue={defaultValue}
                                   placeholder={placeHolder}
                                   onChange={this.handleChangeForm}
                            />
                        </div>
                        {(this.state.alert !== null) &&
                        <div className="alert alert-danger" role="alert">{this.state.alert}</div>}
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
                               onChange={this.handleChangeForm}
                        />
                    </div>
                    {(this.state.alert !== null) &&
                    <div className="alert alert-danger" role="alert">{this.state.alert}</div>}
                </div>
            );
        }
    }
}

export default Form;