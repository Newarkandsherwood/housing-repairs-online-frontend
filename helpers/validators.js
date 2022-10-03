import parsePhoneNumber from 'libphonenumber-js';

const isPhoneNumberValid = (val, additionalValidation) => {
  const phoneNumber = parsePhoneNumber(val, {
    defaultCountry: 'GB',
    extract: false
  })
  if (phoneNumber) {
    return phoneNumber.isValid() && additionalValidation(phoneNumber);
  }
  return false
}

const phoneValidator = {
  isValid: (val) =>{
    return isPhoneNumberValid(val, () => true)
  }
}

const mobilePhoneNumberValidator = {
  isValid: (val) => {
    return isPhoneNumberValid(val, (parsedNumber) => parsedNumber.getType() === 'MOBILE');
  }
}
const postCodeValidator = {
  isValid: (postcode) =>{
    const str = postcode.toUpperCase();
    const regexp = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/;
    return regexp.test(str);
  }
}
const emailValidator = {
  isValid: (email) =>{
    const str = email.toLowerCase();
    const regexp = /^\w+([\.-]?\w+)*([\+\.-]?\w+)?@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexp.test(str);
  }
}

const phoneOnKeyPress = (e) => {
  const charCode = e.which ? e.which : e.keyCode;

  if ((charCode < '0'.charCodeAt() || charCode > '9'.charCodeAt()) && charCode != '+'.charCodeAt()) {
    e.preventDefault();
  }
}

const imageValidator = (file) => {
  const allowedImageTypes = ['image/jpeg', 'image/png'];
  const allowedImageSize = 10;
  if (!allowedImageTypes.includes(file.type)) {
    return 'The selected file must be a JPG or PNG';
  }
  (console.log('file.size', file.size))
  let actualImageSize = (file.size / 1024 / 1024).toFixed(2);
  if (actualImageSize > allowedImageSize) {
    return `The selected file must be smaller than 10MB. Your file size is ${actualImageSize}MB`;
  }
  return undefined;
}

export {
  phoneValidator,
  mobilePhoneNumberValidator,
  postCodeValidator,
  emailValidator,
  phoneOnKeyPress,
  imageValidator
};
