import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Button from '../button';
import imageToBase64 from 'image-to-base64/browser';
import { serviceName } from '../../helpers/constants';
import ErrorSummary from '../errorSummary';
import { isMvpReleaseVersion } from '../../helpers/features';
import ImagePreview from '../image-preview';
import ComponentHeader from '../componentHeader';
import LabelledTextareaWithCharacterCount from '../labelledTextareaWithCharacterCount'

const RepairDescription = ({ handleChange, values }) => {
  const [error, setError] = useState({ text: undefined, img: undefined });
  const [activeError, setActiveError] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedImage, setSelectedImage] = useState(values.description?.photo);
  const [fileExtension, setFileExtension] = useState(values.description?.fileExtension);
  const [base64img, setBase64img] = useState(values.description?.base64img);
  const [text, setText] = useState(values.description?.text)
  const [textAreaCount, setTextAreaCount] = React.useState(0);
  const textLimit = 255
  const title = 'Describe your problem in more detail'
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

  const removePhoto = () => {
    setSelectedImage(null)
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

  const ImageUploadRender = () => {
    if (isMvpReleaseVersion()) {
      return <div className={error.img ? 'govuk-form-group--error' : 'govuk-form-group'}>
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
          <ImagePreview
            image={selectedImage}
            onDelete={removePhoto}
          />
        ) : (
          <input className="govuk-file-upload govuk-file-upload--error"
            id={repairDescriptionUploadPhotoInputId} name="upload-a-photo" type="file"
            aria-describedby="upload-a-photo-error" onChange={PhotoChange} />
        )}
      </div>
    }
    else return '';
  }

  return <div className="govuk-grid-row" data-cy="repair-description">
    <ComponentHeader title={title} />
    <div className="govuk-grid-column-two-thirds">
      {
        (error.text || error.img) && <ErrorSummary active={activeError} errorSummaryTextAndLocation={getErrorSummaryTextAndLocation()} pageTitle={pageTitle} />
      }
      <h1 className="govuk-heading-l">
        {title}
      </h1>
      <form action="">
        <label className="govuk-label" htmlFor="description">
          <div>
            <p>Please describe:</p>
            <ul className="govuk-list govuk-list--bullet">
              <li>the size and location of the problem</li>
              <li>the source of the problem</li>
              <li>how long you have been experiencing the problem</li>
              <li>how many items are damaged, for example 3 floor tiles</li>
            </ul>
            <div className="govuk-inset-text">
              Please report <strong>only one problem</strong> at a time. You will have
              a chance to report another repair after this one.
            </div>
          </div>
        </label>
        <LabelledTextareaWithCharacterCount
          errorText={error.text}
          hasExceededTextLimit={textLimit - textAreaCount < 0}
          onChange={TextChange}
          repairDescriptionTextInputId={repairDescriptionTextInputId}
          text={text}
          textAreaCount={textAreaCount}
          textLimit={textLimit}
        />
      </form>
      <ImageUploadRender />
      <br />
      <Button onClick={Continue} >Continue</Button>
    </div>
  </div>
};

RepairDescription.propTypes = {
  storeAddresses: PropTypes.func,
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default RepairDescription;
