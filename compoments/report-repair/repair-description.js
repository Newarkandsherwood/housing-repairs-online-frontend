import PropTypes from 'prop-types';
import React, {useState} from 'react';
import Button from '../button';
import {serviceName} from '../../helpers/constants';
import ErrorSummary from '../errorSummary';
import CharacterCountMessage from '../character-count-message';
import RepairPicture from '../../compoments/report-repair/repair-picture';

const RepairDescription = ({handleChange, values}) => {
  const [error, setError] = useState(undefined);
  const [activeError, setActiveError] = useState(false);
  const [text, setText] = useState(values.description?.text)
  const [textAreaCount, setTextAreaCount] = React.useState(0);
  const textLimit = 255
  const title = 'Describe your problem in more detail'
  const pageTitle = `${title} - ${serviceName}`;
  const repairDescriptionTextInputId = 'repair-description-text-input';

  const TextChange = (e) => {
    setText(e.target.value)
    setTextAreaCount(e.target.value.length);
    setActiveError(false)
  }

  const ImageUploadRender = () => {
//    const env = process.env
    if (process.env.releaseVersion == 'mvp'){
      return <RepairPicture
              handleChange={handleChange}
              values={values}
            />
    }
    else return "";
  }

  const Continue = () => {
    let textError = undefined;
    setActiveError(true);
    if (textAreaCount > textLimit) {
      textError = `Enter a description of the problem using ${textLimit} characters or less`;
    }
    if (!text) {
      textError = 'Enter a description of the problem';
    }
    if (!textError) {
      return handleChange('description', {
        value: 'version-' + process.env.releaseVersion,
        text: text,
      });
    } else {
      return setError(textError)
    }
  }

  return <div className="govuk-grid-row" data-cy="repair-description">
    <header>
      <title>{pageTitle}</title>
    </header>
    <div className="govuk-grid-column-two-thirds">
      {
        error && <ErrorSummary active={activeError} errorSummaryTextAndLocation={[{text: error, location: `#${repairDescriptionTextInputId}`}]} pageTitle={pageTitle} />
      }
      <h1 className="govuk-heading-l">
        {title}
      </h1>
      <form action="">
        <label className="govuk-label" htmlFor="description">
          <div>
            <p className="govuk-body">Try to include:</p>
            <ul className="govuk-list govuk-list--bullet">
              <li>the size and location of the problem</li>
              <li>the source of the problem</li>
              <li>how long you have been experiencing the problem</li>
              <li>how many items are damaged, for example 3 floor tiles</li>
            </ul>
            <div className="govuk-inset-text">
              Only report <strong>one problem</strong> at a time. You can report another repair after this one.
            </div>
          </div>
        </label>
        <div className='govuk-character-count'>
          <div className={error ? 'govuk-form-group--error' : 'govuk-form-group'}>
            <label className="govuk-label govuk-label--m" htmlFor="description">
            Description of problem
            </label>
            <span id={'description-error'}
              className="govuk-error-message">
              {error}
            </span>
            <textarea
              className={`govuk-textarea ${error && 'govuk-textarea--error'}`}
              id={repairDescriptionTextInputId}
              name="description" type="text"
              onChange={TextChange}
              defaultValue={text}
              rows="5"
            />
            <CharacterCountMessage
              textAreaCount={textAreaCount}
              textLimit={textLimit}
            />
          </div>
        </div>
      </form>
      <ImageUploadRender/>
      <br/>
      <Button onClick={Continue}>Continue</Button>
    </div>
  </div>
};

RepairDescription.propTypes = {
  storeAddresses: PropTypes.func,
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default RepairDescription;
