import PropTypes from 'prop-types';
import Button from './button';
import { Component } from 'react';

import React from 'react';
import ErrorSummary from './errorSummary';
import { serviceName } from '../helpers/constants';

const TextDivider = ({text}) => {
  return <div id="final-divider" className="govuk-radios__divider">{text}</div>
}

TextDivider.propTypes = {
  text: PropTypes.string.isRequired,
};

class RadioFieldSet extends Component {
  constructor(props) {
    super(props);
    this.name = this.props.name;
    this.checked = this.props.checked;
    this.buttonText = this.props.buttonText;
    this.orDivider = this.props.orDivider;
    this.hintText = this.props.hintText;
    this.options = this.props.options.map(o => {
      if (this.checked == o.value) {
        o.checked = true
      }
      return o
    });
    this.title = this.props.title;
    this.onSubmit = this.props.onSubmit;
    this.beforeButton = this.props.beforeButton;
    this.state = {
      error: null,
      value: { [this.name]: this.checked },
      actionableFieldId: `${this.name}-0`,
      activeError: false
    };
    this.conditionalValue = this.props.conditionalValue;
    this.errorText = this.props.errorText || 'Required';
  }

  setValue(event) {
    this.setState({
      value: { [this.name]: event.target.value },
    })
  };

  getConditionalInputId(value) {
    return `${this.name}-${value}`
  }

  getConditionalId(i) {
    return `conditional-${this.name}-${i}`
  }

  formSubmit = () => {
    const value = this.state.value[this.name];
    this.setState({ error: null })

    if (value) {
      const selectedOption = this.options.find(o => o.value === value);
      if (selectedOption.conditional) {
        const optionIndex = this.options.findIndex(o => o.value === value)
        if (this.conditionalValue[value]) {
          if (selectedOption.conditional.validator && !selectedOption.conditional.validator.isValid(this.conditionalValue[value])) {
            return this.setState({ conditionalError: { msg: selectedOption.conditional.invalidInputErrorMessage, field: this.getConditionalId(optionIndex) }, activeError: true })
          }
          return this.onSubmit({
            selected: value,
            input: this.conditionalValue[value]
          })
        }
        this.setState({ actionableFieldId: this.getConditionalInputId(value) })
        return this.setState({ conditionalError: { msg: selectedOption.conditional.emptyInputErrorMessage, field: this.getConditionalId(optionIndex) }, activeError: true })
      }
      let display = selectedOption.title
      this.onSubmit({ val: this.state.value, display: display })
    } else {
      this.setState({ error: this.errorText, activeError: true })
    }
  };

  includeOrDivider(i) {
    return this.orDivider && i == (this.options.length - 1);
  };

  hasConditionalError(i) {
    return this.state.conditionalError && this.state.conditionalError.field === this.getConditionalId(i);
  }

  render() {
    return (
      <div>
        {(this.state.error || this.state.conditionalError) &&
          <ErrorSummary active={this.state.activeError} errorSummaryTextAndLocation={[{ text: this.state.conditionalError ? this.state.conditionalError.msg : this.errorText, location: `#${this.state.actionableFieldId}` }]} pageTitle={`${this.title} - ${serviceName}`} />
        }
        <div className={`govuk-form-group ${this.state.error && !this.state.conditionalError ? 'govuk-form-group--error' : ''}`}>
          <fieldset className="govuk-fieldset" id="repair-emergency"
            name="repair-emergency">
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
              <h1 className="govuk-fieldset__heading">
                {this.title}
              </h1>
            </legend>
            {this.hintText && <div id={`hint-text-${this.name}`} className='govuk-hint'>{this.hintText}</div>}
            <span
              id={`${this.name}-error`}
              className="govuk-error-message"
            >
              {this.state.error}
            </span>
            <div className={this.conditional ? 'govuk-radios--conditional' : 'govuk-radios'}>
              {this.options.map((o, i) => (
                <>
                  {this.includeOrDivider(i) && <TextDivider text='or' />}
                  <div
                    className="govuk-radios__item"
                    key={`radio-item-${i}`}
                  >
                    <input
                      className="govuk-radios__input govuk-input--width-10"
                      id={`${this.name}-${i}`}
                      name={this.name}
                      type="radio"
                      value={o.value}
                      defaultChecked={o.checked}
                      onChange={this.setValue.bind(this)}
                      onClick={() => { this.setState({ activeError: false }) }}
                      data-aria-controls={this.getConditionalId(i)}
                    />
                    <label
                      className="govuk-label govuk-radios__label"
                      htmlFor={`${this.name}-${i}`}
                    >
                      {o.title}
                    </label>
                  </div>
                  {o.conditional &&
                  <div
                    key={`radio-conditional-${i}`}
                    className={`govuk-radios__conditional ${this.state.value[this.name] != o.value && 'govuk-radios__conditional--hidden'}`}
                    id={this.getConditionalId(i)}
                  >
                    <div
                      className={this.hasConditionalError(i) ? 'govuk-form-group--error' : 'govuk-form-group'}
                      key={`conditional-${i}`}
                    >
                      <label
                        className="govuk-label"
                        htmlFor={this.getConditionalInputId(o.value)}
                      >
                        {o.conditional.label}
                      </label>
                      {this.hasConditionalError(i) &&
                        <span
                          id={`${this.name}-conditional-error`}
                          className="govuk-error-message">
                          {this.state.conditionalError.msg}
                        </span>
                      }
                      <input
                        className="govuk-input govuk-!-width-one-third"
                        autoComplete={o.conditional.autoComplete}
                        id={this.getConditionalInputId(o.value)}
                        name={this.getConditionalInputId(o.value)}
                        type={o.conditional.type}
                        defaultValue={this.conditionalValue[o.value]}
                        onChange={(e) => {
                          this.conditionalValue[o.value] = e.target.value
                        }}
                        onWheel={(e) => e.target.blur()}
                        onKeyPress={o.conditional.onKeyPress}
                      />
                    </div>
                  </div>}
                </>
              ))}
            </div>

          </fieldset>
        </div>
        <div>
          <div id="before-button-content">
            {this.beforeButton}
          </div>
          <Button onClick={this.formSubmit}>{this.buttonText}</Button>
        </div>
      </div>
    )
  }
}
RadioFieldSet.defaultProps = {
  conditionalValue: {}
};

RadioFieldSet.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    conditional: PropTypes.objectOf(PropTypes.shape({
      autoComplete: PropTypes.string,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      validator: PropTypes.func.isRequired,
      onKeyPress: PropTypes.func,
      emptyInputErrorMessage: PropTypes.string.isRequired,
      invalidInputErrorMessage: PropTypes.string.isRequired,
    }))
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  checked: PropTypes.string,
  beforeButton: PropTypes.object,
  hintText: PropTypes.string,
  orDivider: PropTypes.bool,
  buttonText: PropTypes.string,
  errorText: PropTypes.string,
  conditionalValue: PropTypes.object
};

export default RadioFieldSet;
