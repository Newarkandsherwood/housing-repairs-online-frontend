import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import Address from '../../compoments/report-repair/address';
import Communal from '../../compoments/report-repair/communal';
import EmergencyRepair from '../../compoments/report-repair/emergency-repair';
import NotEligible from '../../compoments/report-repair/not-eligible';
import NotEligibleCommunalRepairs
from '../../compoments/report-repair/not-eligible-communal-repairs';
import Postcode from '../../compoments/report-repair/postcode';
import PriorityList from '../../compoments/report-repair/priority-list';
import RepairLocation from '../../compoments/report-repair/repair-location';
import SmellGas from '../../compoments/report-repair/smell-gas';
import Flow from '../../flow';
import {useEffect, useState} from 'react';
import React from 'react';
import BackLink from '../../compoments/backLink';
import RepairProblem from '../../compoments/report-repair/repair-problem';
import RepairProblemBestDescription from '../../compoments/report-repair/repair-problem-best-description';
import RepairDescription from '../../compoments/report-repair/repair-description';
import RepairAvailability from '../../compoments/report-repair/repair-availability';
import Summary from '../../compoments/report-repair/summary';
import ContactPerson from '../../compoments/report-repair/contact-person';
import ContactDetails from '../../compoments/report-repair/contact-details';
import Confirmation from '../../compoments/report-repair/confirmation';
import Error from '../../compoments/error';
import NotEligibleNonEmergency from '../../compoments/report-repair/not-eligible-non-emergency';
import UnableToBook from '../../compoments/report-repair/unable-to-book';
import RepairImageUpload from '../../compoments/report-repair/repair-image-upload';
import Loader from '../../compoments/loader';
import useSWR from 'swr'
import { fetcher } from '../../helpers/fetcher';
import ContactUs from '../../compoments/report-repair/contact-us';
import {customerServicesTelephoneNumber} from '../../globals'
import TenantOrLeaseholder from '../../compoments/report-repair/tenant-or-leaseholder';
import CommunalRepairs from '../../compoments/report-repair/communal-repairs';
import { getRepairType, isCommunalRepairType } from '../../helpers/repairType';
import ContactNumberConfirmation from '../../compoments/report-repair/contact-number-confirmation';
import FindRepair from '../../compoments/report-repair/find-repair';
import RepairAppointment from '../../compoments/report-repair/repair-appointment';
import CancelConfirmation from '../../compoments/report-repair/cancel-confirmation';
import RepairCancelledConfirmation from '../../compoments/report-repair/repair-cancelled-confirmation';
import RepairAppointmentChangedConfirmation from '../../compoments/report-repair/repair-appointment-changed-confirmation';

const ReportRepairWrapper = ({children, prevStep, showBackLink}) => {
  return (
    <>
      {showBackLink && <BackLink href="#" onClick={prevStep}>Back</BackLink>}
      <main className="govuk-main-wrapper" id='main-content'>
        {children}
      </main>
    </>
  )
}

ReportRepairWrapper.propTypes = {
  prevStep: PropTypes.func.isRequired,
  showBackLink: PropTypes.bool.isRequired
};

function ReportRepair() {
  const router = useRouter()
  const currentPath = router.query.route
  const [state, setState] = useState({data:{}, step: currentPath == 'find-repair' ? 'find-repair' : 'priority-list'});

  const emergencyValue = 'emergency';
  const notEligibleNonEmergencyValue = 'notEligibleNonEmergency';
  const unableToBookValue = 'unableToBook';
  const contactUsValue = 'contactUs';

  const shouldRequestTriageData = currentPath === 'repair-location' || currentPath === 'repair-problems' || currentPath === 'repair-problem-best-description';

  function useRepairTriageData() {
    const repairTriageApiUrl = `/api/repairTriage?repairType=${getRepairType(state.data)}&emergencyValue=${emergencyValue}&notEligibleNonEmergencyValue=${notEligibleNonEmergencyValue}&unableToBookValue=${unableToBookValue}&contactUsValue=${contactUsValue}`

    const { data, error } = useSWR(shouldRequestTriageData ? repairTriageApiUrl : null, fetcher, {dedupingInterval : 600000});

    return {
      repairTriageData: data,
      isLoading: !error && ! data,
      isError: error
    }
  }

  const [prevSteps, setPrevSteps] = useState([]);

  let flow = new Flow(setState, router, 'report-repair', prevSteps, setPrevSteps);

  useEffect(() => {
    router.beforePopState(({ as }) => {
      flow.prevStep(state)
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router]);

  const handleChange = (input, value) => {
    flow.handleChange(input,value,state)
  };

  const goToStep = (step, prevStep) => {
    flow.nextStep(step, state, prevStep)
  }

  const noBackLinkRequired = ['repair-cancelled-confirmation', 'repair-appointment-changed-confirmation']

  const [showBack, setShowBack] = useState(!noBackLinkRequired.includes(currentPath))
  const [confirmation, setConfirmation] = useState('');
  const [formError, setFormError] = useState();
  const [requestId, setRequestId] = useState();
  const [daysForRepair, setdaysForRepair] = useState();

  const { repairTriageData, isLoading, isError } = useRepairTriageData()

  const prevStep = (e) => {
    e?.preventDefault();
    flow.prevStep(state)
  }

  if (shouldRequestTriageData) {
    if (isLoading) return (
      <ReportRepairWrapper showBackLink={showBack} prevStep={prevStep}>
        <Loader/>
      </ReportRepairWrapper>
    )
    if (isError) return (
      <ReportRepairWrapper showBackLink={showBack} prevStep={prevStep}>
        <Error
          name="summary"
          heading="An error occurred while looking for repair options"
          body={`Please try again later or call ${customerServicesTelephoneNumber} to complete your repair request`}
        />
      </ReportRepairWrapper>)
  }

  const cleanPayload = (payload) => {
    delete payload.availability?.appointmentSlotKey
  }

  const submit = (values) => {
    cleanPayload(values)
    fetch(`/api/repair?repairType=${getRepairType(state.data)}`, {
      method: 'POST',
      body: JSON.stringify({
        postcode: values.postcode,
        address: values.address,
        location: values.repairLocation,
        problem: values.repairProblem,
        issue: values.repairProblemBestDescription,
        contactPersonNumber: values.contactPersonNumber,
        description: values.description,
        contactDetails: values.contactDetails,
        time: values.availability
      }),
    }).then(response =>{
      console.log(response)
      if (response.ok) {
        setShowBack(false);
        router.push('confirmation');
        setConfirmation(values.contactDetails.value);
        return response.json().then((json)=> {
          setRequestId(json.id);
          setdaysForRepair(json.daysForRepair);
        });
      }
      window.history.scrollRestoration = 'manual';
      setFormError(
        <Error
          name="summary"
          heading="An error occurred while processing your request"
          body={`Please call ${customerServicesTelephoneNumber} to complete your repair request`} />
      )
    })
  }
  const submitCancelRepair = (values) => {
    fetch(`/api/tenantOrLeaseholdPropertyRepairCancel?postcode=${values.findrepair.postcode}&repairId=${values.findrepair.repairId}`, {
      method: 'POST',
    }).then(response => {
      if (response.ok) {
        setShowBack(false);
        router.push('repair-cancelled-confirmation');
        setConfirmation(values.repairAppointmentDetails.contactDetails.value);
        return;
      }
      window.history.scrollRestoration = 'manual';
      setFormError(
        <Error
          name="summary"
          heading="An error occurred while processing your request"
          body={`Please call ${customerServicesTelephoneNumber} to complete your repair request cancellation`} />
      )
    })
  };
  const submitChangeAppointment = (values) => {
    fetch(`/api/TenantOrLeaseholdPropertyRepairChangeAppointmentSlot?postcode=${values.postcode}&repairId=${values.repairId}`, {
      method: 'POST',
      body: JSON.stringify({
        startDateTime: values.appointmentStartDateTime,
        endDateTime: values.appointmentEndDateTime,
        display : values.appointmentDisplay
      })
    }).then(response => {
      if (response.ok) {
        setShowBack(false);
        setConfirmation({
          contact: values.contactDetails,
          appointment: values.appointmentDisplay
        });
        router.push('repair-appointment-changed-confirmation');
        return;
      }
      window.history.scrollRestoration = 'manual';
      setFormError(
        <Error
          name="summary"
          heading="An error occurred while processing your request"
          body={`Please call ${customerServicesTelephoneNumber} to complete your repair request change`} />
      )
    })
  }
  const values = state.data;

  const getRepairLocation = () => {
    return repairTriageData.find(option => option.value === state.data['repairLocation'].value)
  }

  const getUniqueOptionValue = (value, index) => {
    const hasUniqueValueId = [emergencyValue, notEligibleNonEmergencyValue, unableToBookValue, contactUsValue]
    return hasUniqueValueId.includes(value) ? `${value}-${index}` : value
  }

  function getNextSteps(optionValue) {
    switch (optionValue) {
    case unableToBookValue:
      return 'unable-to-book';
    case emergencyValue:
      return 'emergency-repair';
    case notEligibleNonEmergencyValue:
      return 'not-eligible-non-emergency';
    case contactUsValue:
      return 'contact-us';
    default:
      return 'repair-description';
    }
  }

  const component = () => {
    switch (currentPath) {
    case 'summary' :
      return (
        <Summary
          goToStep={goToStep}
          submit={submit}
          values={values}
        />
      )
    case 'confirmation':
      return (
        <Confirmation
          requestId={requestId}
          confirmation={confirmation}
          values={values}
          daysForRepair={daysForRepair}
        />
      )
    case 'contact-person':
      return (
        <ContactPerson
          handleChange={handleChange}
          values={values}
        />
      )
    case 'contact-details':
      return (
        <ContactDetails
          handleChange={handleChange}
          values={values}
        />
      )
    case 'contact-number-confirmation':
      return (
        <ContactNumberConfirmation
          handleChange={handleChange}
          values={values}
        />
      )
    case 'address':
      const addressNextStep = isCommunalRepairType(values) ? 'communal-repairs' : 'repair-location';
      flow = new Flow(setState, router, 'report-repair', prevSteps, setPrevSteps, addressNextStep);
      return (
        <Address
          handleChange={handleChange}
          values={values}
          goToStep={goToStep}
        />
      )
    case 'communal':
      return (
        <Communal
          handleChange={handleChange}
          values={values}/>
      )
    case 'emergency-repair':
      return (
        <EmergencyRepair
          goToStep={goToStep}
          prevStep={state.prevStep}
        />
      )
    case 'not-eligible':
      return (
        <NotEligible
          goToStep={goToStep}
          postcode={values.postcode}
        />
      )
    case 'not-eligible-non-emergency':
      return (
        <NotEligibleNonEmergency/>
      )
    case 'not-eligible-communal-repairs':
      return (
        <NotEligibleCommunalRepairs/>
      )
    case 'unable-to-book':
      return (
        <UnableToBook/>
      )
    case 'postcode':
      return (
        <Postcode
          handleChange={handleChange}
          values={values}/>
      )
    case 'priority-list':
      return (
        <PriorityList
          handleChange={handleChange}
          values={values}/>
      )
    case 'repair-location':
      const options = repairTriageData.map(option => {return {value: option.value, title: option.display}} )
      const nextSteps = repairTriageData.map(
        option => {return {
          condition: option.value,
          nextStep: 'repair-problems'
        }}
      )
      flow = new Flow(setState, router, 'report-repair', prevSteps, setPrevSteps, nextSteps);

      return repairTriageData ?
        (<RepairLocation
          handleChange={handleChange}
          values={values}
          options={options}
        />)
        :
        (<Loader />)
    case 'repair-problems':
      const selectedLocation = getRepairLocation();

      const problemOptions = selectedLocation.options.map(
        (option, index) => {return {
          value: getUniqueOptionValue(option.value, index),
          nextStepValue: option.value,
          title: option.display,
          options: option.options
        }}
      )
      const problemNextSteps = problemOptions.map(
        option => {return {
          condition: option.value,
          nextStep:option.options ? 'repair-problem-best-description': getNextSteps(option.nextStepValue)
        }}
      )
      flow = new Flow(setState, router, 'report-repair', prevSteps, setPrevSteps, problemNextSteps);

      return (
        <RepairProblem
          handleChange={handleChange}
          values={values}
          options = {problemOptions}
        />
      )
    case 'repair-problem-best-description':
      const selectedLocationBestDescription = getRepairLocation();
      const selectedOption = selectedLocationBestDescription.options.find(option => option.value === state.data['repairProblem'].value);
      const problemBestDescriptionOptions = selectedOption.options.map(
        (option, index) => {return {
          value: getUniqueOptionValue(option.value, index),
          nextStepValue: option.value,
          title: option.display
        }}
      );
      const problemBestDescriptionNextSteps = problemBestDescriptionOptions.map(
        option => {return {
          condition: option.value,
          nextStep: getNextSteps(option.nextStepValue)
        }}
      )
      flow = new Flow(setState, router, 'report-repair', prevSteps, setPrevSteps, problemBestDescriptionNextSteps);

      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {problemBestDescriptionOptions}
        />
      )
    case 'smell-gas':
      return (
        <SmellGas/>
      )
    case 'repair-description':
      return (
        <RepairDescription
          handleChange={handleChange}
          values={values}
        />
      )
    case 'repair-image-upload':
      const imageUploadNextStep = isCommunalRepairType(values) ? 'contact-details' : 'repair-availability';
      flow = new Flow(setState, router, 'report-repair', prevSteps, setPrevSteps, imageUploadNextStep);
      return (
        <RepairImageUpload
          handleChange={handleChange}
          values={values}
        />
      )
    case 'repair-availability':
      var params = {
        repairType: getRepairType(values),
        repairLocation: values.repairLocation?.value,
        repairProblem: values.repairProblem?.value,
        locationId: values.address?.locationId
      }
      if (values.repairProblemBestDescription) {
        params['repairIssue']= values.repairProblemBestDescription.value
      }

      var repairAvailabilityOptions = {
        params: params,
        availability: values.availability
      }
      return (
        <RepairAvailability
          stepName={'repair-availability'}
          handleChange={handleChange}
          values={repairAvailabilityOptions}
          fromDate={router.query.fromDate}
        />)
    case 'change-repair-availability':
      var repairAvailabilityOptions = {
        params: {
          repairType: values.repairAppointmentDetails?.repairType,
          repairLocation: values.repairAppointmentDetails?.location?.value,
          repairProblem: values.repairAppointmentDetails?.problem?.value,
          locationId: values.repairAppointmentDetails?.address?.locationId,
          repairIssue:  values.repairAppointmentDetails?.issue?.value,
        },
        postcode: values.findrepair?.postcode,
        repairId: values.findrepair?.repairId,
        contactDetails: values.repairAppointmentDetails?.contactDetails?.value
      }
      return (
        <RepairAvailability
          stepName={'change-repair-availability'}
          values={repairAvailabilityOptions}
          fromDate={router.query.fromDate}
          submitChangeAppointment={submitChangeAppointment}
          isSubmit={true}
        />)
    case 'contact-us':
      return (
        <ContactUs
          handleChange={handleChange}
          values={values}
          fromDate={router.query.fromDate}
        />
      )
    case 'tenant-or-leaseholder':
      return (
        <TenantOrLeaseholder
          handleChange={handleChange}
          values={values}
        />
      )
    case 'communal-repairs':
      return (
        <CommunalRepairs
          handleChange={handleChange}
          values={values}
        />
      )
    case 'find-repair':
      return (
        <FindRepair
          handleChange={handleChange}
          values={values}
        />
      )
    case 'repair-appointment':
      return (
        <RepairAppointment
          handleChange={handleChange}
          values={values}
        />
      )
    case 'cancel-confirmation':
      return (
        <CancelConfirmation
          handleChange={handleChange}
          values={values}
          submitCancelRepair={submitCancelRepair}
        />
      )
    case 'repair-cancelled-confirmation':
      return (
        <RepairCancelledConfirmation />
      )
    case 'repair-appointment-changed-confirmation':
      return (
        <RepairAppointmentChangedConfirmation
          confirmation={confirmation}
        />
      )
    default:
      return <div>Not found</div>;
    }
  }
  return (
    <ReportRepairWrapper showBackLink={showBack} prevStep={prevStep}>
      {formError}
      {component()}
    </ReportRepairWrapper>
  )
}

export async function getStaticPaths() {

  const paths = [
    {params: { route: 'summary'}},
    {params: { route: 'address'} },
    {params: { route: 'confirmation'} },
    {params: { route: 'communal'} },
    {params: { route: 'emergency-repair'} },
    {params: { route: 'contact-person'} },
    {params: { route: 'contact-details'} },
    {params: { route: 'contact-number-confirmation'} },
    {params: { route: 'not-eligible'} },
    {params: { route: 'not-eligible-non-emergency'} },
    {params: { route: 'not-eligible-communal-repairs'} },
    {params: { route: 'unable-to-book'} },
    {params: { route: 'postcode'} },
    {params: { route: 'priority-list'} },
    {params: { route: 'repair-location'} },
    {params: { route: 'repair-problems'} },
    {params: { route: 'repair-problem-best-description'} },
    {params: { route: 'smell-gas'} },
    {params: { route: 'repair-description'} },
    {params: { route: 'repair-image-upload'} },
    {params: { route: 'repair-availability'} },
    {params: { route: 'smell-gas'} },
    {params: { route: 'contact-us'} },
    {params: { route: 'tenant-or-leaseholder'} },
    {params: { route: 'communal-repairs'} },
    {params: { route: 'find-repair'} },
    {params: { route: 'repair-appointment'} },
    {params: { route: 'cancel-confirmation'} },
    {params: { route: 'repair-cancelled-confirmation'} },
    {params: { route: 'repair-appointment-changed-confirmation'} },
    {params: { route: 'change-repair-availability'}},
  ]

  return { paths, fallback: false };
}

export async function getStaticProps({ }) {
  return { props: {} };
}
export default ReportRepair;
