import PropTypes from 'prop-types';
import Button from './button';
import React from 'react';
import {Component} from 'react';
import ErrorSummary from './errorSummary';
import { serviceName } from '../helpers/constants';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.autoComplete = this.props.autoComplete;
    this.name = this.props.name;
    this.title = this.props.title;
    this.label = this.props.label;
    this.hint = this.props.hint;
    this.onKeyPress = this.props.onKeyPress;
    this.long = this.props.long;
    this.onSubmit = this.props.onSubmit;
    this.buttonText = this.props.buttonText;
    this.validation = this.props.validation;
    this.type = this.props.type;
    this.emptyInputErrorMessage = this.props.emptyInputErrorMessage;
    this.widthClassName = this.props.widthClassName;
    this.state = {
      value: this.props.value || '',
      error: {},
      activeError: false
    };

    this.input = {
      defaultValue: this.props.value,
      id: this.name,
      onChange: this.setValue.bind(this)
    }
  }

  setValue(event) {
    this.setState({
      value: event.target.value,
      activeError: false
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
          },
          activeError: true
        })
      }
      return this.onSubmit(this.state.value)
    }
    this.setState({
      value: this.state.value,
      error: {
        msg: this.emptyInputErrorMessage || 'Required',
        touched: true
      },
      activeError: true
    })
  };

  render(){
    return (
      <>
        <form action="">
          {this.state.error.msg && <ErrorSummary active={this.state.activeError} errorSummaryTextAndLocation={[{text: this.state.error.msg, location: `#${this.input.id}`}]} pageTitle={`${this.title} - ${serviceName}`} />}
          <div className={`govuk-form-group ${this.state.error.msg ? 'govuk-form-group--error' : ''}`}>
            <h1 id={`${this.name}-title`}  className="govuk-heading-l" data-testid={`${this.name}-title`}>{this.title}</h1>
            <label className="govuk-label" htmlFor={this.input.id} data-testid={`${this.name}-label`}>
              {this.label}
            </label>
            <div id="event-name-hint" className="govuk-hint" data-testid={`${this.name}-hint-text`}>
              {this.hint}
            </div>
            <span id={`${this.name}-error`}
              className="govuk-error-message" data-testid={`${this.name}-error`}>
              {this.state.error.msg}
            </span>
            <input className={`govuk-input ${this.widthClassName ?? ''}`} id={this.input.id}
              name={this.name}
              type={this.type}
              onChange={this.input.onChange}
              defaultValue={this.input.defaultValue}
              onWheel={(e) => e.target.blur()}
              onKeyPress={this.onKeyPress}
              data-testid={this.input.id}
              autoComplete={this.autoComplete}
            />
          </div>
          <Button onClick={this.formSubmit} >{this.buttonText}</Button>
        </form>
      </>
    )
  }
}

TextInput.propTypes = {
  autoComplete: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  title:  PropTypes.string.isRequired,
  validation: PropTypes.shape({
    errorMessage: PropTypes.string,
    isValid: PropTypes.func
  }),
  hint: PropTypes.string,
  buttonText: PropTypes.string,
  emptyInputErrorMessage: PropTypes.string,
  widthClassName: PropTypes.string,
};
export default TextInput;
