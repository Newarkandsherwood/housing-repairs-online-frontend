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
  const [changeLinkUrls, setChangeLinkUrls] = useState({});
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
  const changeLinkUrlValues = changeLinkUrls

  const component = () => {
    switch (currentPath) {
    case 'summary' :
      return (
        <Summary
          getNextStepFromCondition={flow.getNextStepFromCondition}
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
        heading="An error occurred while looking for your address"
        body="Please try again later or call 01522 873333 to complete your repair request" />
      if (!repairTriageData) return <Loader />
      const options = repairTriageData.map(option => {return {value: option.value, title: option.display}} )
      const nextSteps = repairTriageData.map(option => {return {condition: option.value, nextStep: 'repair-problems'}} )
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
        heading="An error occurred while looking for your address"
        body="Please try again later or call 01522 873333 to complete your repair request" />
      if (!repairTriageData) return <Loader />
      const selectedLocation = repairTriageData.find(option => option.value === state.data['repairLocation'].value);
      const problemOptions = selectedLocation.options.map(option => {return {value: option.value, title: option.display}} )
      const problemNextSteps = problemOptions.map(option => {return {condition: option.value, nextStep: option.value === unableToBookValue ? 'unable-to-book' : option.value === emergencyValue?'emergency-repair': option.value === notEligibleNonEmergencyValue ? 'not-eligible-non-emergency': 'repair-description'}} )
      flow = new Flow(setState, router, 'report-repair', prevSteps, setPrevSteps, problemNextSteps);

      return (
        <RepairProblem
          handleChange={handleChange}
          values={values}
          options = {problemOptions}
        />
      )
    case 'repair-stairs-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            {value: 'damagedSteps', title: 'Damaged stairs'},
            {value: 'damagedPalistrades', title: 'Damaged palistrades'},
            {value: 'handRail', title: 'Handrail'},
            {value: 'stairRailLoose', title: 'Stair rail come loose'}
          ]}
        />
      )
    case 'repair-toilet-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            { value: 'notFlushing', title: 'Not flushing'},
            { value: 'overflowing', title: 'Overflowing'},
            { value: 'looseFromFloorOrWall', title: 'Coming loose from the floor or wall'},
            { value: 'cracked', title: 'Cracked'},
            { value: 'seat', title: 'Toilet seat'} ]}
        />
      )
    case 'repair-garage-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            { value: 'doorDamage', title: 'Door damage'},
            { value: 'lockDamage', title: 'Lock damage'},
            { value: 'brokenInto', title: 'Broken into'},
            { value: 'roofIssueOrLeak', title: 'Roof issue or leak'},
            { value: 'securityLights', title: 'Outdoor security lights'},
          ]}
        />
      )
    case 'outside-roof-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            { value: 'shedOuthouseRoof', title: 'Shed or outhouse roof'},
            { value: 'loftInsulation', title: 'Loft insulation'},
            { value: 'looseTiles', title: 'Loose tiles'},
            { value: 'flatRoofProblems', title: 'Problem with a flat roof'},
            { value: 'securityLights', title: 'Outdoor security lights'}
          ]}
        />
      )
    case 'gates-and-pathways-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            {value: 'frontGate', title: 'Front gate'},
            {value: 'backGate', title: 'Back gate'},
            {value: 'driveway', title: 'Driveway'},
            {value: 'concretePath', title: 'Concrete path around the property'},
            {value: 'steps', title: 'Steps'}
          ]}
        />
      )
    case 'outside-door-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            { value: 'shedDoor', title: 'Shed door'},
            { value: 'outhouseCupboardDoor', title: 'Outhouse cupboard door'},
            { value: 'woodenBackDoor', title: 'Wooden back door'},
            { value: 'upvcBackDoor', title: 'UPVC back door'},
            { value: 'frenchDoors', title: 'French doors'}
          ]}
        />
      )
    case 'repair-window-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            { value: 'smashed', title: 'Smashed window(s)'},
            { value: 'stuckOpen', title: 'Window stuck open'},
            { value: 'stuckShut', title: 'Window stuck shut'},
            { value: 'condensation', title: 'Condensation'}
          ]}
        />
      )
    case 'repair-shower-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            { value: 'electricShowerUnit', title: 'Electric shower unit'},
            { value: 'showerTap', title: 'Tap shower'},
            { value: 'showerHose', title: 'Shower hose'},
            { value: 'showerHead', title: 'Shower head'},
            { value: 'showerTrayBroken', title: 'Shower tray broken'},
            { value: 'cubicleDoorBroken', title: 'Cubicle door broken'},
            { value: 'showerDrainBlocked', title: 'Shower drain blocked'}
          ]}
        />
      )
    case 'repair-door-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            { value: 'internalDoorIssue', title: 'Internal door issue, including hinges, handle, sticking'},
            { value: 'lockOnDoor', title: 'Lock on the door'},
            { value: 'adjustingDoorAfterCarpetFitting', title: 'Adjusting a door after a carpet fitting'},
          ]}
        />
      )
    case 'repair-living-area-door-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            { value: 'internalDoorIssue', title: 'Internal door issue, including hinges, handle, sticking'},
            { value: 'lockOnDoor', title: 'Lock on the door'},
            { value: 'adjustingDoorAfterCarpetFitting', title: 'Adjusting a door after a carpet fitting'},
          ]}
        />
      )
    case 'repair-bedroom-door-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options={[
            { value: 'internalDoorIssue', title: 'Internal door issue, including hinges, handle, sticking'},
            { value: 'adjustingDoorAfterCarpetFitting', title: 'Adjusting a door after a carpet fitting'},
          ]}
        />
      )
    case 'repair-bedroom-lighting-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            { value: 'lights', title: 'Lights'},
            { value: 'sockets', title: 'Sockets'}
          ]}
        />
      )
    case 'bathroom-damp-mould-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            { value: 'emergency', title: 'Damp or mould caused by a leak'},
            { value: 'dampOrMould', title: 'Damp or mould caused by something else'}
          ]}
        />
      )
    case 'repair-living-areas-lighting-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            { value: 'lights', title: 'Lights'},
            { value: 'sockets', title: 'Sockets'}
          ]}
        />
      )
    case 'repair-bathroom-electric-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            { value: 'spotLights', title: 'Spot lights'},
            { value: 'tubeLights', title: 'Tube light'},
            { value: 'pullCord', title: 'Pull cord for light or shower'},
            { value: 'extractorFan', title: 'Extractor fan not working'},
          ]}
        />
      )
    case 'repair-kitchen-cupboard-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            { value: 'doorHangingOff', title: 'Hanging door'},
            { value: 'doorMissing', title: 'Missing door'},
          ]}
        />
      )
    case 'kitchen-electrical-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            {value: 'extractorFan', title: 'Extractor fan'},
            {value: 'sockets', title: 'Socket(s)'},
            {value: 'lightFitting', title: 'Light fitting(s)'},
            {value: 'cookerSwitch', title: 'Cooker switch'}
          ]}
        />
      )
    case 'bath-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            {value: 'bathTaps', title: 'Bath taps'},
            {value: 'sealAroundBath', title: 'Seal around bath'},
            {value: 'bathPanel', title: 'Bath panel'},
            {value: 'bathBlockage', title: 'Blockage'}
          ]}
        />
      )
    case 'kitchen-door-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            {value: 'backDoorWooden', title: 'Wooden back door'},
            {value: 'backDoorUPVC', title: 'UPVC back door'},
            {value: 'backFrenchDoors', title: 'French doors'},
            {value: 'internal', title: 'Internal door issue, including hinges, handle, sticking'},
            {value: 'sliding', title: 'Sliding door'}
          ]}
        />
      )
    case 'wall-floor-ceiling-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            { value: 'wallTiles', title: 'Wall tiles'},
            { value: 'floorTiles', title: 'Floor tiles'},
            { value: 'lightFitting', title: 'Light fitting(s)'},
            { value: 'skirtingBoardArchitrave', title: 'Skirting boards or architraves'},
            { value: 'plasteringCeiling', title: 'Plastering on the ceiling'},
            { value: 'plasteringWalls', title: 'Plastering on the walls'},
            { value: 'woodenFloorboards', title: 'Wooden floorboards'},
          ]}
        />
      )
    case 'sink-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            { value: 'taps', title: 'Tap(s)'},
            { value: 'pipeworkLeak', title: 'Pipework leak'},
            { value: 'leakBlockage', title: 'Leak or blockage'},
            { value: 'damageSink', title: 'Damage to the sink'}
          ]}
        />
      )
    case 'damp-mould-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            { value: 'dampMouldCausedByLeak', title: 'Damp or mould caused by a leak'},
            { value: 'dampOrMould', title: 'Damp or mould caused by something else'}
          ]}
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
    {params: { route: 'smell-gas'} },
    {params: { route: 'sink-problems'} },
    {params: { route: 'bathroom-damp-mould-problems'} },
    {params: { route: 'repair-living-areas-lighting-problems'} },
    {params: { route: 'wall-floor-ceiling-problems'} },
    {params: { route: 'repair-stairs-problems'} },
    {params: { route: 'bath-problems'} },
    {params: { route: 'damp-mould-problems'} },
    {params: { route: 'kitchen-electrical-problems'} },
    {params: { route: 'kitchen-door-problems'} },
    {params: { route: 'repair-kitchen-cupboard-problems'} },
    {params: { route: 'repair-bedroom-lighting-problems'} },
    {params: { route: 'repair-bathroom-electric-problems'} },
    {params: { route: 'repair-living-area-door-problems'} },
    {params: { route: 'repair-bedroom-door-problems'} },
    {params: { route: 'repair-door-problems'}},
    {params: { route: 'repair-toilet-problems'}},
    {params: { route: 'repair-garage-problems'}},
    {params: { route: 'repair-window-problems'} },
    {params: { route: 'outside-roof-problems'}},
    {params: { route: 'outside-door-problems'}},
    {params: { route: 'gates-and-pathways-problems'}},
    {params: { route: 'repair-shower-problems'} },
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
