import React from 'react';
import { serviceName } from '../helpers/constants';

export default function Loader({}) {
  return (
    <>
      <header>
        <title>Loading - {serviceName}</title>
      </header>
      <div className="loader"></div>
      <h4 className="govuk-!-text-align-centre">
        Loading
      </h4>
    </>
  );
}
