import PropTypes from 'prop-types';
import Button from './button';
import { Component } from 'react';

import React from 'react';
import { ErrorSummary } from './errorSummary';

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
      value: { [this.name]: this.checked }
    };
    this.conditionalValue = this.props.conditionalValue;
    this.errorText = this.props.errorText || 'Required';
  }

  setValue(event) {
    this.setState({
      value: { [this.name]: event.target.value },
      error: null,
      conditionalError: null
    })
  };

  formSubmit = () => {
    const value = this.state.value[this.name];
    if (value) {
      const selectedOption = this.options.find(o => o.value === value);
      if (selectedOption.conditional) {
        if (this.conditionalValue[value]) {
          if (selectedOption.conditional.validator && !selectedOption.conditional.validator.isValid(this.conditionalValue[value])) {
            return this.setState({ conditionalError: selectedOption.conditional.invalidInputErrorMessage })
          }
          return this.onSubmit({
            selected: value,
            input: this.conditionalValue[value]
          })
        }
        return this.setState({ conditionalError: selectedOption.conditional.emptyInputErrorMessage })
      }
      let display = selectedOption.title
      this.onSubmit({ val: this.state.value, display: display })
    } else {
      this.setState({ error: this.errorText })
    }
  };

  includeOrDivider(i) {
    return this.orDivider && i == (this.options.length - 1);
  };

  render() {

    return (
      <div>
        {(this.state.error || this.state.conditionalError) &&
          <ErrorSummary errorSummaryText={this.state.conditionalError || this.errorText} errorSummaryLocation={this.state.conditionalError ? `#${this.name}-conditional-error` : `#${this.name}-error`} />
        }
        <div className={this.state.error && !this.state.conditionalError ? 'govuk-form-group--error' : 'govuk-form-group'}>
          <fieldset className="govuk-fieldset" id="repair-emergency"
            name="repair-emergency">
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
              <h1 className="govuk-fieldset__heading">
                {this.title}
              </h1>
            </legend>
            {this.hintText && <div id={`hint-text-${this.name}`} className='govuk-hint'>{this.hintText}</div>}
            <div className="govuk-form-group">
              <span id={`${this.name}-error`}
                className="govuk-error-message govuk-!-margin-bottom-0">
                {this.state.error}
              </span>
              <div className={this.conditional ? 'govuk-radios--conditional' : 'govuk-radios'}>
                {this.options.map((o, i) => (
                  <span key={i}>
                    {this.includeOrDivider(i) ? <div id="final-divider" className="govuk-radios__divider">or</div> : <div className="govuk-!-margin-bottom-2"></div>}
                    <div className="govuk-radios__item">
                      <input className="govuk-radios__input govuk-input--width-10"
                        id={`${this.name}-${i}`} name={this.name}
                        type="radio" value={o.value}
                        defaultChecked={o.checked}
                        onChange={this.setValue.bind(this)}
                        data-aria-controls={`conditional-${this.name}-${i}`}
                      />
                      <label className="govuk-label govuk-radios__label"
                        htmlFor={`${this.name}-${i}`}>
                        {o.title}
                      </label>
                    </div>
                    {o.conditional && <div
                      className={`govuk-radios__conditional ${this.state.value[this.name] != o.value && 'govuk-visually-hidden'}`}
                      id={`conditional-${this.name}-${i}`}>
                      <div className={this.state.conditionalError ? 'govuk-form-group--error' : 'govuk-form-group'} key={`conditional-${i}`}>
                        <label className="govuk-hint" htmlFor={`${this.name}-${o.value}`}>
                          {o.conditional.label}
                        </label>
                        <span id={`${this.name}-conditional-error`}
                          className="govuk-error-message">
                          {this.state.conditionalError}
                        </span>
                        <input className="govuk-input govuk-!-width-one-third"
                          id={`${this.name}-${o.value}`} name={`${this.name}-${o.value}`}
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
                  </span>
                ))}
              </div>
            </div>

          </fieldset>
        </div>
        <div>
          <div id="before-button-content" className="govuk-!-margin-top-6">
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
  options: PropTypes.array.isRequired,
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


