import PropTypes from 'prop-types';
import React, {useState} from 'react';
import Button from '../button';
import ErrorSummary from '../errorSummary';
import {serviceName} from '../../helpers/constants';
import imageToBase64 from 'image-to-base64/browser';

const RepairPicture = ({ handleChange, values }) => {
  const [error, setError] = useState(undefined);
  const [activeError, setActiveError] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedImage, setSelectedImage] = useState(values.description?.photo);
  const [fileExtension, setFileExtension] = useState(values.description?.fileExtension);
  const [base64img, setBase64img] = useState(values.description?.base64img);
  const title = process.env.releaseVersion == 'mvp'? 'Upload a photo (optional)': 'Upload an image of the problem (optional)';
  const pageTitle = `${title} - ${serviceName}`;
  const repairDescriptionUploadPhotoInputId = 'repair-description-upload-a-photo-input';

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

  const ContinueButtonRender = () => {
    if (process.env.releaseVersion == 'mvp'){
      return "";
    }
    else return <Button onClick={Continue} >Continue</Button>;
  }  

  const Continue = () => {
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
    if (!imageError) {
      return handleChange('description', {
        photo: selectedImage,
        fileExtension: fileExtension,
        base64img: base64img
      });
    } else {
      setSelectedImage(null);
      setSelectedFile(null);
      return setError(imageError)
    }
  }

  return <div className="govuk-grid-row" data-cy="repair-description">
    <header>
      <title>{pageTitle}</title>
    </header>
    <div className="govuk-grid-column-two-thirds">
      {error && <ErrorSummary active={activeError} errorSummaryTextAndLocation={[{ text: error, location: '#repair-description-upload-a-photo-input' }]} pageTitle={pageTitle} />}
      <form action="">
        <div className="govuk-form-group">
          <h1 className="govuk-label-wrapper">
            <label className="govuk-label govuk-label--xl" htmlFor="repairImage">{title}</label>
          </h1>
          <div className={error ? 'govuk-form-group--error' : 'govuk-form-group'}>
            <div className="govuk-hint">You do not have to upload an image but doing so may help us arrange your repair faster</div>
            <span id="upload-a-photo-error" className="govuk-error-message">
              {error}
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
        </div>
        <br />
      <ContinueButtonRender></ContinueButtonRender>
      </form>
    </div>
  </div>
};

RepairPicture.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default RepairPicture;
