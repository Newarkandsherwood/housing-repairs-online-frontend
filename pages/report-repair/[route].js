import {useRouter} from 'next/router';
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
import Loader from '../../compoments/loader';
import useSWR from 'swr'
import { fetcher } from '../../helpers/fetcher';

function ReportRepair() {
  const [state, setState] = useState({data:{}, step: 'priority-list'});
  const [repairTriageData, setRepairTriageData] = useState(undefined);
  const router = useRouter()

  const currentPath = router.query.route

  const emergencyValue = 'emergency';
  const notEligibleNonEmergencyValue = 'notEligibleNonEmergency';
  const unableToBookValue = 'unableToBook';

  const repairTriageApiUrl = `/api/repairTriage?emergencyValue=${emergencyValue}&notEligibleNonEmergencyValue=${notEligibleNonEmergencyValue}&unableToBookValue=${unableToBookValue}`
  const shouldRequestTriageData = repairTriageData === undefined && (currentPath === 'repair-location' || currentPath === 'repair-problems');
  const { data: repairTriageResponse, error: repairTriageFetchError } = useSWR(shouldRequestTriageData ? repairTriageApiUrl : null, fetcher);
  useEffect(() => {
    !repairTriageData && setRepairTriageData(repairTriageResponse)
  }, [repairTriageResponse, repairTriageData])

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

  const [showBack, setShowBack] = useState(true)
  const [confirmation, setConfirmation] = useState('');
  const [formError, setFormError] = useState();
  const [requestId, setRequestId] = useState();

  const cleanPayload = (payload) => {
    delete payload.availability.appointmentSlotKey
  }

  const submit = (values) => {
    cleanPayload(values)
    fetch('/api/repair', {
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
        return response.text().then((text)=> {
          setRequestId(text);
        });
      }
      window.history.scrollRestoration = 'manual';
      setFormError(
        <Error
          name="summary"
          heading="An error occurred while processing your request"
          body="Please call 01522 873333 to complete your repair request" />
      )
    })
  }
  const prevStep = (e) => {
    e?.preventDefault();
    flow.prevStep(state)
  }
  const values = state.data;

  const getRepairLocation = () => {
    return repairTriageData.find(option => option.value === state.data['repairLocation'].value)
  }

  const getRepairOptions = (selectedOptions) => {
    return selectedOptions.map(option => {return {value: option.value, title: option.display}} )
  }

  function getNextSteps(optionValue) {
    switch (optionValue) {
    case unableToBookValue:
      return 'unable-to-book';
    case emergencyValue:
      return 'emergency-repair';
    case notEligibleNonEmergencyValue:
      return 'not-eligible-non-emergency';
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
    case 'address':
      return (
        <Address
          handleChange={handleChange}
          values={values}/>
      )
    case 'communal':
      return (
        <Communal
          handleChange={handleChange}
          values={values}/>
      )
    case 'emergency-repair':
      return (
        <EmergencyRepair/>
      )
    case 'not-eligible':
      return (
        <NotEligible/>
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
      if (repairTriageFetchError) return <Error
        name="summary"
        heading="An error occurred while looking for repair options"
        body="Please try again later or call 01522 873333 to complete your repair request" />
      if (!repairTriageData) return <Loader />
      const options = getRepairOptions(repairTriageData)
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
      if (repairTriageFetchError) return <Error
        name="summary"
        heading="An error occurred while looking for repair options"
        body="Please try again later or call 01522 873333 to complete your repair request" />
      if (!repairTriageData) return <Loader />
      const selectedLocation = getRepairLocation();
      const problemOptions = selectedLocation.options.map(
        option => {return {
          value: option.value,
          title: option.display,
          options: option.options
        }}
      )
      const problemNextSteps = problemOptions.map(option => {return {condition: option.value,
        nextStep:option.options ? 'repair-problem-best-description': getNextSteps(option.value)
      }} )
      flow = new Flow(setState, router, 'report-repair', prevSteps, setPrevSteps, problemNextSteps);

      return (
        <RepairProblem
          handleChange={handleChange}
          values={values}
          options = {problemOptions}
        />
      )
    case 'repair-problem-best-description':
      if (repairTriageFetchError) return <Error
        name="summary"
        heading="An error occurred while looking for repair options"
        body="Please try again later or call 01522 873333 to complete your repair request" />
      if (!repairTriageData) return <Loader />
      const selectedLocationBestDescription = getRepairLocation();
      const selectedOption = selectedLocationBestDescription.options.find(option => option.value === state.data['repairProblem'].value);
      const problemBestDescriptionOptions = getRepairOptions(selectedOption.options);
      const problemBestDescriptionNextSteps = problemBestDescriptionOptions.map(option => {return {
        condition: option.value,
        nextStep: getNextSteps(option.value)
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
    case 'repair-availability':
      return (
        <RepairAvailability
          handleChange={handleChange}
          values={values}
          fromDate={router.query.fromDate}
        />
      )
    default:
      return <div>Not found</div>;
    }
  }

  return (
    <>
      {showBack && <BackLink href="#" onClick={prevStep}>Back</BackLink>}
      <main className="govuk-main-wrapper" id='main-content'>
        {formError}
        {component()}
      </main>
    </>
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
    {params: { route: 'repair-availability'} },
    {params: { route: 'smell-gas'} }
  ]

  return { paths, fallback: false };
}

export async function getStaticProps({ }) {
  return { props: {} };
}
export default ReportRepair;
