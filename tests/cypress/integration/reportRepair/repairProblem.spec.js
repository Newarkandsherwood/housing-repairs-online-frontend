import {
  navigateToLocation,
  makeSelectionAndClickButton,
  checkIfSelectionGoesToCorrectUrl
} from '../../support/helpers';

const genericWhatIsTheProblemOptions = () => {
  it('displays the repair problem question', () => {
    cy.contains('What is the problem?');
  });

  it('displays a "walls" option', () => {
    cy.contains('Walls, floor or ceiling, excluding damp');
  });

  it('displays a "electrics" option', () => {
    cy.contains('Electrics, including lights and switches');
  });

}
describe('repairProblem', () => {

  context('kitchen', () => {
    before(() => {
      navigateToLocation()
      makeSelectionAndClickButton('Kitchen');
    });

    it('displays the repair problem question', () => {
      cy.contains('What is the problem?');
    });

    it('displays a "cupboards" option', () => {
      cy.contains('Cupboards, including damaged cupboard doors');
    });

    it('displays a "walls" option', () => {
      cy.contains('Walls, floor or ceiling, excluding damp');
    });

    it('displays a "electrical" option', () => {
      cy.contains('Electrical, including extractor fans and lightbulbs');
    });

    it('displays a "worktop" option', () => {
      cy.contains('Damaged worktop');
    });

    it('displays a "sink" option', () => {
      cy.contains('Sink, including taps and drainage');
    });

    it('displays a "door" option', () => {
      cy.contains('Damaged or stuck doors');
    });

    it('displays a "heating" option', () => {
      cy.contains('Heating or hot water');
    });

    it('displays a "window" option', () => {
      cy.contains('Damaged or stuck windows');
    });

    it('displays a "Damp or mould" option', () => {
      cy.contains('Damp or mould');
    });

    context('When a user doesn\'t select anything', ()=>{
      it('should show validation message',  () => {
        cy.get('button').click().then(()=>{
          cy.contains('Select the problem you are reporting');
        });
      });
    });
  });

  context('Bathroom', () => {
    before(() => {
      navigateToLocation()
      makeSelectionAndClickButton('Bathroom');
    });

    it('displays the repair problem question', () => {
      cy.contains('What is the problem?');
    });

    it('displays a "walls" option', () => {
      cy.contains('Walls, floor or ceiling, excluding damp');
    });

    it('displays a "bath" option', () => {
      cy.contains('Bath, including taps');
    });

    it('displays a "sink" option', () => {
      cy.contains('Sink, including taps and drainage');
    });

    it('displays a "electrics" option', () => {
      cy.contains('Electrics, including extractor fan and pull cords');
    });

    it('displays a "window" option', () => {
      cy.contains('Damaged or stuck windows');
    });

    it('displays a "Damp or mould" option', () => {
      cy.contains('Damp or mould');
    });

    it('displays a "door" option', () => {
      cy.contains('Damaged or stuck doors');
    });

    it('displays a "shower" option', () => {
      cy.contains('Shower, including the tray and shower door');
    });

    it('displays a "toilet" option', () => {
      cy.contains('Toilet');
    });

    it('displays a "heating" option', () => {
      cy.contains('Heating or hot water');
    });

    context('When a user doesn\'t select anything', ()=>{
      it('should show validation message',  () => {
        cy.get('button').click().then(()=>{
          cy.contains('Select the problem you are reporting');
        });
      });
    });
  });

  context('Bedroom', () => {
    before(() => {
      navigateToLocation()
      makeSelectionAndClickButton('Bedroom');
    });

    genericWhatIsTheProblemOptions();

    it('displays a "window" option', () => {
      cy.contains('Damaged or stuck windows');
    });

    it('displays a "door" option', () => {
      cy.contains('Damaged or stuck doors');
    });

    it('displays a "Damp or mould" option', () => {
      cy.contains('Damp or mould');
    });

    it('displays a "Heating" option', () => {
      cy.contains('Heating');
    });

    context('When a user doesn\'t select anything', ()=>{
      it('should show validation message',  () => {
        cy.get('button').click().then(()=>{
          cy.contains('Select the problem you are reporting');
        });
      });
    });
  });

  context('Living Areas', () => {
    before(() => {
      navigateToLocation();
      makeSelectionAndClickButton('Living Areas');
    });

    it('displays a "walls" option', () => {
      genericWhatIsTheProblemOptions();
    });

    it('displays a "window" option', () => {
      cy.contains('Damaged or stuck windows');
    });

    it('displays a "door" option', () => {
      cy.contains('Damaged or stuck doors');
    });

    it('displays a "Damp or mould" option', () => {
      cy.contains('Damp or mould');
    });

    it('displays a "Stairs (including handrail)" option', () => {
      cy.contains('Stairs (including handrail)');
    });

    it('displays a "Heating" option', () => {
      cy.contains('Heating');
    });

    context('When a user doesn\'t select anything', ()=>{
      it('should show validation message',  () => {
        cy.get('button').click().then(()=>{
          cy.contains('Select the problem you are reporting');
        });
      });
    });
  });

  context('Outside', () => {
    before(() => {
      navigateToLocation()
      makeSelectionAndClickButton('Outside');
    });

    it('displays the repair problem question', () => {
      cy.contains('What is the problem?');
    });

    it('displays a "Door, including shed and outhouse" option', () => {
      cy.contains('Door, including shed and outhouse');
    });

    it('displays a "Outdoor security lights" option', () => {
      cy.contains('Outdoor security lights');
    });

    it('displays a "Roof, including insulation and shed roof" option', () => {
      cy.contains('Roof, including insulation and shed roof')
    });

    it('displays a "Gates and pathways" option', () => {
      cy.contains('Gates and pathways')
    });

    it('displays a "Garage, including roof and door" option', () => {
      cy.contains('Garage, including roof and door');
    });

    context('When a user doesn\'t select anything', ()=>{
      it('should show validation message',  () => {
        cy.get('button').click().then(()=>{
          cy.contains('Select the problem you are reporting');
        });
      });
    });
  });

  context('When a user selects a problem which is an early exit', ()=>{
    beforeEach(()=>{
      navigateToLocation();
    })
    it('should redirect them to unable to book page',  () => {
      checkIfSelectionGoesToCorrectUrl('/report-repair/unable-to-book', 'Kitchen', 'Heating or hot water')
    });
    it('should redirect them to the emergency page',  () => {
      checkIfSelectionGoesToCorrectUrl('/report-repair/emergency-repair', 'Hallway', 'Rug is on fire')
    });
    it('should redirect them to the not eligible and non-emergency page',  () => {
      checkIfSelectionGoesToCorrectUrl('/report-repair/not-eligible-non-emergency', 'Hallway', 'Mirror is dirty')
    });
  });

  context('When a user selects a location and problem which allows them to continue', ()=>{
    beforeEach(()=>{
      navigateToLocation();
    })
    it('should redirect them to description page',  () => {
      checkIfSelectionGoesToCorrectUrl('/report-repair/repair-description', 'Kitchen', 'Damaged worktop')
    })

    it('should redirect them to the best description page & then to description page',  () => {
      checkIfSelectionGoesToCorrectUrl('/report-repair/repair-problem-best-description', 'Kitchen', 'Cupboards, including damaged cupboard doors')
      checkIfSelectionGoesToCorrectUrl('/report-repair/repair-description', 'Hanging door');
    })
  });
});
