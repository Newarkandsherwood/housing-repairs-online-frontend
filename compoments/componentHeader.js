import React from 'react';
import PropTypes from 'prop-types';
import { serviceName } from '../helpers/constants';

const ComponentHeader = ({title}) => {
  return (
    <header>
      <title>{title} - {serviceName}</title>
    </header>)
}

ComponentHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default ComponentHeader;
