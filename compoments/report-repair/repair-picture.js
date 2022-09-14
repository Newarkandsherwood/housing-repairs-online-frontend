import PropTypes from 'prop-types';
import React from 'react';

const RepairPicture = ({handleChange, values}) => {
  console.log('I am in repair picture')
  return <div>Repair Picture</div>
};

RepairPicture.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default RepairPicture;
