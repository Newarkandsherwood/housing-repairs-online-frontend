import PropTypes from 'prop-types';
import Button from './button';
import React from 'react';
import {Component} from 'react';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.name = this.props.name;
    this.title = this.props.title;
    this.hint = this.props.hint;
    this.onKeyPress = this.props.onKeyPress;
    this.long = this.props.long;
    this.onSubmit = this.props.onSubmit;
    this.buttonText = this.props.buttonText;
    this.validation = this.props.validation;
    this.type = this.props.type;
    this.state = {
      value: this.props.value || '',
      error: {}
    };
  }

  input = {
    defaultValue: this.props.value,
    id: this.name,
    onChange: this.setValue.bind(this)
  }

  setValue(event) {
    this.setState({
      value: event.target.value,
      error: {}
    })
  };

  formSubmit = (e) => {
    e.preventDefault();

    if (this.state.value?.length > 0) {
      this.setState({
        value: this.state.value,
        error: {}
      });
      if (this.validation && !this.validation.isValid(this.state.value)) {
        return this.setState({
          value: this.state.value,
          error: {
            msg: this.validation.errorMessage,
            touched: true
          }
        })
      }
      return this.onSubmit(this.state.value)
    }
    this.setState({
      value: this.state.value,
      error: {
        msg: 'Required',
        touched: true
      }
    })
  };

  render() {
    return (
      <>
        <div
          className={this.state.error.msg ? 'govuk-form-group--error' : 'govuk-form-group'}>
          <form action=""
            className={(this.long ? 'govuk-grid-column-two-thirds' : 'govuk-grid-column-one-third') + ' govuk-!-padding-0'}>
            <h1 className="govuk-label-wrapper govuk-label--xl">
              <label className="govuk-label govuk-label--l"
                htmlFor={this.input.id}>
                {this.title}
              </label>
            </h1>
            <span id={`${this.name}-error`}
              className="govuk-error-message govuk-!-margin-bottom-0">
              {this.state.error.msg}
            </span>
            <div id={`${this.name}-hint`} className="govuk-hint"
              aria-desibedby="id-hint">
              {this.hint}
            </div>
            <input className="govuk-input govuk-!-margin-bottom-6"
              id={this.input.id}
              name={this.name}
              type={this.type}
              onChange={this.input.onChange}
              defaultValue={this.input.defaultValue}
              onWheel={(e) => e.target.blur()}
              onKeyPress={this.onKeyPress}
              aria-describedby={`${this.name}-hint`}
            />
            <Button onClick={this.formSubmit}>{this.buttonText}</Button>
          </form>
        </div>
      </>
    )
  }
}

TextInput.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  validation: PropTypes.shape({
    errorMessage: PropTypes.string,
    isValid: PropTypes.func
  }),
};
export default TextInput;
