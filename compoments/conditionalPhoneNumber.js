import { mobilePhoneNumberValidator, phoneOnKeyPress } from '../helpers/validators';

export const conditionalPhoneNumber = {
  autoComplete: 'tel',
  label: 'UK mobile number',
  type: 'tel',
  validator: mobilePhoneNumberValidator,
  onKeyPress: phoneOnKeyPress,
  emptyInputErrorMessage: 'Enter a UK mobile number',
  invalidInputErrorMessage: 'Enter a valid UK mobile number',
}
