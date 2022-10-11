import React from 'react';
import ComponentHeader from './ComponentHeader';

export default function Error({ name, heading, body }) {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <ComponentHeader title={heading} />
      <div
        className={`govuk-error-${name}`}
        aria-labelledby={`error-${name}-title`}
        role="alert"
        tabIndex="-1"
        data-module={`govuk-error-${name}`}
      >
        <h2 className={`govuk-error-${name}__title`} id={`error-${name}-title`}>
          {heading}
        </h2>
        <div className={`govuk-error-${name}__body`}>
          <p>{body}</p>
        </div>
      </div>
    </>
  );
}
