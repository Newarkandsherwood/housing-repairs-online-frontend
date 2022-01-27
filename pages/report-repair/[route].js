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

function ReportRepair() {
  const [state, setState] = useState({data:{}, step: 'priority-list'});
  const [changeLinkUrls, setChangeLinkUrls] = useState({});
  const router = useRouter()

  const currentPath = router.query.route

  const [prevSteps, setPrevSteps] = useState([]);

  const flow = new Flow(setState, router, 'report-repair', prevSteps, setPrevSteps);

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

  const submit = (values) => {
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
          heading="An error occurred while requesting your request"
          body="Please call 01522 873333 to complete your repair request"></Error>
      )
    })
  }

  const commonProblems = {
    wallsFloorAndCeiling: { value: 'wallsFloorsCeiling', title: 'Walls, floor or ceiling, excluding damp' },
    sink: { value: 'sink', title: 'Sink, including taps and drainage'},
    damagedOrStuckDoors: { value: 'damagedOrStuckDoors', title: 'Damaged or stuck doors' },
    electricsLightsSwitches: {value: 'electricsLightsSwitches', title: 'Electrics, including lights and switches'},
    damagedOrStuckWindows: { value: 'damagedOrStuckWindows', title: 'Damaged or stuck windows'},
    dampOrMould: { value: 'dampOrMould', title: 'Damp or mould'}
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
    case 'not-eligible-communal-repairs':
      return (
        <NotEligibleCommunalRepairs/>
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
      return (
        <RepairLocation
          handleChange={handleChange}
          values={values}
        />
      )
    case 'repair-kitchen-problems':
      return (
        <RepairProblem
          handleChange={handleChange}
          values={values}
          options = {[
            { value: 'cupboards', title: 'Cupboards, including damaged cupboard doors'},
            { value: 'electrical', title: 'Electrical, including extractor fans and lightbulbs'},
            { value: 'worktop', title:   'Damaged worktop'},
            { value: 'heatingOrHotWater', title: 'Heating or hot water'},
            { value: 'door', title: 'Damaged or stuck doors'},
            commonProblems.wallsFloorAndCeiling,
            commonProblems.sink,
            { value: 'windows', title: 'Damaged or stuck windows'},
          ]}
        />
      )
    case 'repair-bathroom-problems':
      return (
        <RepairProblem
          handleChange={handleChange}
          values={values}
          options = {[
            {value: 'bath', title: 'Bath, including taps'},
            commonProblems.wallsFloorAndCeiling,
            {value: 'electricsExtractorCords', title: 'Electrics, including extractor fan and pull cords'},
            { value: 'windows', title: 'Damaged or stuck windows'},
            commonProblems.sink,
          ]}
        />
      )
    case 'repair-bedroom-problems':
      return (
        <RepairProblem
          handleChange={handleChange}
          values={values}
          options = {[
            commonProblems.electricsLightsSwitches,
            commonProblems.wallsFloorAndCeiling,
            { value: 'windows', title: 'Damaged or stuck windows'},
          ]}
        />
      )
    case 'repair-living-areas-problems':
      return (
        <RepairProblem
          handleChange={handleChange}
          values={values}
          options = {[
            commonProblems.electricsLightsSwitches,
            commonProblems.wallsFloorAndCeiling,
            { value: 'windows', title: 'Damaged or stuck windows'},
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
    case 'repair-kitchen-heating-problems':
      return (
        <RepairProblemBestDescription
          handleChange={handleChange}
          values={values}
          options = {[
            { value: 'boiler', title: 'Boiler'},
            { value: 'radiator', title: 'Radiator'}
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
      <div className="govuk-!-margin-top-7">
        {formError}
        {component()}
      </div>
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
    {params: { route: 'not-eligible-communal-repairs'} },
    {params: { route: 'postcode'} },
    {params: { route: 'priority-list'} },
    {params: { route: 'repair-location'} },
    {params: { route: 'smell-gas'} },
    {params: { route: 'repair-kitchen-problems'} },
    {params: { route: 'sink-problems'} },
    {params: { route: 'repair-bathroom-problems'} },
    {params: { route: 'repair-bedroom-problems'} },
    {params: { route: 'repair-living-areas-problems'} },
    {params: { route: 'repair-living-areas-lighting-problems'} },
    {params: { route: 'wall-floor-ceiling-problems'} },
    {params: { route: 'bath-problems'} },
    {params: { route: 'kitchen-electrical-problems'} },
    {params: { route: 'kitchen-door-problems'} },
    {params: { route: 'repair-kitchen-cupboard-problems'} },
    {params: { route: 'repair-kitchen-heating-problems'} },
    {params: { route: 'repair-bedroom-lighting-problems'} },
    {params: { route: 'repair-bathroom-electric-problems'} },
    {params: { route: 'repair-window-problems'} },
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
