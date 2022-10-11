import React from 'react';
import ComponentHeader from './ComponentHeader';

export default function Loader({}) {
  return (
    <>
      <ComponentHeader title='Loading' />
      <div className="loader"></div>
      <h4 className="govuk-!-text-align-centre">
        Loading
      </h4>
    </>
  );
}
