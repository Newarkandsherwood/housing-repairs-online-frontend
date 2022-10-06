import PropTypes from 'prop-types';
import React from 'react';

const ImagePreview =({image, onDelete}) => {
  return (
    <table>
      <tbody>
        <tr>
          <td align="center" valign="center">
            <img alt="not found" width="200px" src={image} />
          </td>
          <td align="center" valign="center">
            <button
              className="govuk-button govuk-button--warning"
              onClick={() => onDelete()}
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

ImagePreview.propTypes = {
  image: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default ImagePreview;
