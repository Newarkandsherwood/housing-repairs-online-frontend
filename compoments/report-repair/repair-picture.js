import PropTypes from 'prop-types';
import React, {useState} from 'react';
import Button from '../button';
import ErrorSummary from '../errorSummary';
import {serviceName} from '../../helpers/constants';

const RepairPicture = ({ handleChange, values }) => {
  const [error, setError] = useState({ text: undefined, img: undefined });
  const [activeError, setActiveError] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedImage, setSelectedImage] = useState(values.description?.photo);
  const [fileExtension, setFileExtension] = useState(values.description?.fileExtension);
  const [base64img, setBase64img] = useState(values.description?.base64img);
  const [text, setText] = useState(values.description?.text)
  const [textAreaCount, setTextAreaCount] = React.useState(0);
  const textLimit = 255
  const title = 'Upload an image of the problem (optional)'
  const pageTitle = `${title} - ${serviceName}`;
  const repairDescriptionTextInputId = 'repair-description-text-input';
  const repairDescriptionUploadPhotoInputId = 'repair-description-upload-a-photo-input';

  const TextChange = (e) => {
    setText(e.target.value)
    setTextAreaCount(e.target.value.length);
    setActiveError(false)
  }

  const saveFileAsImage = (file) => {
    const image = URL.createObjectURL(file);
    imageToBase64(image)
      .then(
        (response) => {
          setBase64img(response);
          setSelectedImage(image);
          setFileExtension(file.name.split('.').pop());
        }
      )
      .catch(
        (error) => {
          console.log(error);
        }
      )
  }

  const PhotoChange = (event) => {
    const uploadedFile = event.target.files[0]
    setActiveError(false)
    setSelectedFile(uploadedFile)
    saveFileAsImage(uploadedFile)
  }

  const Continue = () => {
    let textError = undefined;
    let imageError = undefined;
    setActiveError(true);
    if (selectedFile) {
      if (selectedFile.type !== 'image/jpeg') {
        imageError = 'The selected file must be a JPG';
      }
      let size = (selectedFile.size / 1024 / 1024).toFixed(2);
      if (size > 10) {
        imageError = `The selected file must be smaller than 10MB. Your file size is ${size}MB`;
      }
    }
    if (textAreaCount > textLimit) {
      textError = `Enter a description of the problem using ${textLimit} characters or less`;
    }
    if (!text) {
      textError = 'Enter a description of the problem';
    }
    if (!textError && !imageError) {
      return handleChange('description', {
        photo: selectedImage,
        text: text,
        fileExtension: fileExtension,
        base64img: base64img
      });
    } else {
      setSelectedImage(null);
      setSelectedFile(null);
      return setError({ text: textError, img: imageError })
    }
  }

  const getErrorSummaryTextAndLocation = () => {
    const errorSummaryTextAndLocation = [];
    error.text && errorSummaryTextAndLocation.push({ text: error.text, location: `#${repairDescriptionTextInputId}` });
    error.img && errorSummaryTextAndLocation.push({ text: error.img, location: `#${repairDescriptionUploadPhotoInputId}` });
    return errorSummaryTextAndLocation;
  }

  return <div className="govuk-grid-row" data-cy="repair-description">
    <header>
      <title>{pageTitle}</title>
    </header>
    <div className="govuk-grid-column-two-thirds">
      {
        (error.text || error.img) && <ErrorSummary active={activeError} errorSummaryTextAndLocation={getErrorSummaryTextAndLocation()} pageTitle={pageTitle} />
      }
      <h1 className="govuk-heading-l">
        {title}
      </h1>
      <form action="">
        <div className={error.img ? 'govuk-form-group--error' : 'govuk-form-group'}>
          <h3 className="govuk-heading-m">
                    Upload a photo (optional)
          </h3>
          <label className="govuk-label" htmlFor="upload-a-photo">
                    Upload a file
          </label>
          <span id="upload-a-photo-error" className="govuk-error-message">
            {error.img}
          </span>
          {selectedImage ? (
            <table>
              <tbody>
                <tr>
                  <td align="center" valign="center">
                    <img alt="not fount" width="200px" src={selectedImage} />
                  </td>
                  <td align="center" valign="center">
                    <button
                      className="govuk-button govuk-button--warning"
                      onClick={() => setSelectedImage(null)}>
                                        Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <input className="govuk-file-upload govuk-file-upload--error"
              id={repairDescriptionUploadPhotoInputId} name="upload-a-photo" type="file"
              aria-describedby="upload-a-photo-error" onChange={PhotoChange} />
          )}
        </div>
      </form>
      <br />
      <Button onClick={Continue} >Continue</Button>
    </div>
  </div>
};

RepairPicture.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default RepairPicture;
