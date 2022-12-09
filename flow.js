import { isMvpReleaseVersion } from './helpers/features';

class Flow {
  constructor(setState, history, path, prevSteps, setPrevSteps, nextSteps = undefined) {
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
        {condition: 'yes', nextStep: isMvpReleaseVersion() ? 'not-eligible-communal-repairs' : 'postcode'},
        {condition: 'no', nextStep: isMvpReleaseVersion() ? 'postcode' : 'tenant-or-leaseholder'}
      ]},
      'tenant-or-leaseholder' : {prevSteps: 'communal', nextStep: 'postcode'},
      'postcode': {prevStep: true, nextStep: 'address'},
      'address': {prevStep: 'postcode', nextStep: nextSteps},
      'communal-repairs':{ prevSteps: 'address', nextStep:'repair-location'},
      'repair-location': { prevStep: true, nextStep: nextSteps},
      'repair-problems': { prevStep: 'repair-location', nextStep: nextSteps},
      'repair-problem-best-description': { prevStep: 'repair-problems', nextStep: nextSteps},
      'repair-description': {prevStep: true, nextStep: isMvpReleaseVersion()? 'contact-person' : 'repair-image-upload'},
      'repair-image-upload': { prevStep: 'repair-description', nextStep: nextSteps},
      'contact-person': {prevStep: 'contact-details', nextStep:'summary'},
      'contact-details': {prevStep: 'repair-availability', nextStep: [
        {condition: 'text', nextStep: 'contact-number-confirmation'},
        {condition: 'email', nextStep: 'contact-person'}
      ]},
      'contact-number-confirmation': {prevStep: 'contact-details', nextStep:'summary'},
      'repair-availability': {prevStep: 'repair-image-upload', nextStep: 'contact-details'},
      'summary': {prevStep: true, nextStep: ''},//need to investigate this as there are numerous prev steps, but it might just work
      'find-repair' : {prevStep: true, nextStep: 'repair-appointment'},
      'repair-appointment' : {prevStep: true, nextStep: [
        {condition: 'cancel', nextStep: 'cancel-confirmation'},
        {condition: 'changeAppointmentSlot', nextStep: ''}
      ]},
      'cancel-confirmation': {prevStep: 'change-type', nextStep: [
        {condition: 'yes', nextStep: 'repair-cancelled-confirmation'},
        {condition: 'no', nextStep: 'repair-appointment'}]},
      'repair-cancelled-confirmation': {prevStep: 'cancel-confirmation', nextStep: ''}
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
          condition = nextFlowStep.find(o => o.condition === value.value || o.condition === value.type)
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
