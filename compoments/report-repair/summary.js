import React from 'react';
import SummaryList from '../summaryList';
import Button from '../button';
import {isMvpReleaseVersion}  from '../../helpers/features';
import { getRepairType } from '../../helpers/repairType';
import ComponentHeader from '../componentHeader';

const Summary = ({values, submit, goToStep}) => {
  const title = 'Request summary'
  const repairType = getRepairType(values);

  const personalDetailsSummary = [
    {pageName:'Repair address', value: values.address?.display, link: 'postcode'},
    {pageName:'Appointment contact number', value: values.contactPersonNumber, link: 'contact-person'},
  ]
  const repairDetailsSummary = [
    { pageName:'Where is the problem?', value: values.repairLocation?.display, link:'repair-location'},
    { pageName:'What is the problem?', value: values.repairProblem?.display, link: 'repair-problems'},
    { pageName:'Description', value: values.description?.text, link:'repair-description'}
  ]
  if (!isMvpReleaseVersion() && repairType != 'Communal') {
    repairDetailsSummary.push(
      { pageName:'Repair Image', value: values.description?.filename, link:'repair-image-upload'}
    );

    if (repairType != 'Communal') {
      repairDetailsSummary.push(
      { pageName:'What best describes the problem?', value: values['repairProblemBestDescription']?.display, link: 'repair-problem-best-description'},
      )};
  }

  const appointmentDetailsSummary = [
    { pageName:'Date', value: values.availability?.display, link:'repair-availability'},
    { pageName:'Confirmation contact details', value: values.contactDetails?.value, link: 'contact-details'},
  ]

  const AppointmentDetailsRender = () => {
    if (repairType != 'Communal') {
      return <>
          <h2 className="govuk-heading-m">Appointment details</h2>
            <SummaryList goToStep={goToStep} summary={appointmentDetailsSummary}/>
        </>      
    }
    else return '';
  }

  return(
    <>
      <ComponentHeader title={title} />
      { (
        <div data-cy="summary">
          <div className="govuk-grid-row govuk-body-m">
            <div className="govuk-grid-column-two-thirds">
              <h1 className='govuk-heading-xl'>Request summary</h1>
              <h2 className="govuk-heading-m">Personal details</h2>
              <SummaryList goToStep={goToStep} summary={personalDetailsSummary}/>
              <h2 className="govuk-heading-m">Repair details</h2>
              <SummaryList goToStep={goToStep} summary={repairDetailsSummary}/>
              <AppointmentDetailsRender />              
            </div>
          </div>
          <Button
            preventDoubleClick={true}
            onClick={()=>{
              submit(values);
            }}>Continue</Button>
        </div>
      )}
    </>
  )
}
export default Summary
