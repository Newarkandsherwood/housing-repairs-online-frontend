import { isMvpReleaseVersion } from './helpers/features';

class Flow {
  constructor(setState, history, path, prevSteps, setPrevSteps, repairTriageNextSteps = undefined) {
    this.setState = setState;
    this.history = history;
    this.path = path;
    this.prevSteps = prevSteps;
    this.setPrevSteps = setPrevSteps;
    this.flow = {
      'priority-list': {prevStep: false, nextStep: [
        {condition: 'gas-emergency/1', nextStep: 'smell-gas'},
        {condition: 'emergency/2', nextStep: 'emergency-repair'},
        {condition: 'emergency/3', nextStep: 'emergency-repair'},
        {condition: 'emergency/4', nextStep: 'emergency-repair'},
        {condition: 'emergency/5', nextStep: 'emergency-repair'},
        {condition: 'emergency/6', nextStep: 'emergency-repair'},
        {condition: 'emergency/7', nextStep: 'emergency-repair'},
        {condition: 'emergency/8', nextStep: 'emergency-repair'},
        {condition: 'non-emergency/9', nextStep: 'communal'}
      ]},
      'emergency-repair': {},
      'not-eligible': {},
      'communal': {prevStep: isMvpReleaseVersion()? 'priority-list' : true, nextStep: [
        {condition: 'yes', nextStep: 'not-eligible-communal-repairs'},
        {condition: 'no', nextStep: isMvpReleaseVersion() ? 'postcode' : 'tenant-or-leaseholder'}
      ]},
      'tenant-or-leaseholder' : {prevSteps: 'communal', nextStep: 'postcode'},
      'postcode': {prevStep: 'communal', nextStep: 'address'},
      'address': {prevStep: 'postcode', nextStep: 'repair-location'},
      'repair-location': { prevStep: 'address', nextStep: repairTriageNextSteps},
      'repair-problems': { prevStep: 'repair-location', nextStep: repairTriageNextSteps},
      'repair-problem-best-description': { prevStep: 'repair-problems', nextStep: repairTriageNextSteps},
      'repair-description': {prevStep: true, nextStep: isMvpReleaseVersion()? 'contact-person' : 'repair-image-upload'},
      'repair-image-upload': { prevStep: 'repair-description', nextStep: 'contact-person'},
      'contact-person': {prevStep: 'repair-description', nextStep:'contact-details'},
      'contact-details': {prevStep: 'contact-person', nextStep: 'repair-availability'},
      'repair-availability': {prevStep: 'contact-details', nextStep: 'summary'},
      'summary': {prevStep: 'repair-availability', nextStep: ''},//need to investigate this as there are numerous prev steps, but it might just work
    }
  };
  nextStep (step, state, prevStep) {
    state.prevStep = prevStep ? prevStep : state.step
    this.setPrevSteps([...this.prevSteps, state.prevStep])
    state.step = step;
    this.setState(state);

    this.history.push(step)
  };

  _stepIsInFlow = (state) => (this.flow[state.step])

  getNextStepFromCondition = (condition) => {
    for (const [_, value] of Object.entries(this.flow)) {
      let steps = value.nextStep
      if (Array.isArray(steps)) {
        const step = steps.filter(step => step.condition == condition)
        if (step.length > 0) {
          return step[0].nextStep
        }
      }
    }
  }

  prevStep = (state) => {
    const step = this.prevSteps.pop();
    state.prevStep = step;
    state.step = step;
    this.setPrevSteps(this.prevSteps);

    if (this._stepIsInFlow(state)) {
      this.setState(state);
      this.history.push(state.prevStep)
    } else {
      return this.history.push('/')
    }
  }
  handleChange = (input, value, state) => {
    let repairProblemChanged = input == 'repairProblem' && state.data[input] != value;
    state.data[input]= value
    let nextFlowStep =  this.flow[state.step]?.nextStep
    if (nextFlowStep) {
      if (Array.isArray(nextFlowStep)) {
        let condition
        if(typeof value === 'object'){
          condition = nextFlowStep.find(o => o.condition === value.value)
        }else{
          condition = nextFlowStep.find(o => o.condition === value);
        }
        nextFlowStep = condition ? condition.nextStep : state.step;
      }
      if(nextFlowStep == 'repair-description' && repairProblemChanged){
        delete state.data['repairProblemBestDescription']
      }
      return this.nextStep(nextFlowStep, state);
    }

    const { flowNextStep, flowPrevStep } = this._stepsFromUrl()
    state.prevStep = flowPrevStep;
    this.nextStep(flowNextStep, state, flowPrevStep);
  };

  _stepsFromUrl = () =>{
    const urlStep = window.location.pathname.split('/').pop()
    const flowNextStep = Object.keys(this.flow).find(key => this.flow[key].prevStep === urlStep);
    return {
      flowNextStep: flowNextStep,
      flowPrevStep: urlStep
    }
  }
}
export default Flow;
