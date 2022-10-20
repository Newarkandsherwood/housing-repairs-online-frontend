import dummyData from '../../fixtures/availableAppointments.json'

describe('SearchProperties', () => {
  const repairLocation = 'Kitchen'
  const repairProblem = 'Cupboards, including damaged cupboard doors'
  const repairIssue = 'Missing door'
  const locationId = '100023336956'
  const dummyData = dummyData;
  const repairType = 'Tenant';
  const fromDate = '2022-01-01';

  let mockGetRequest;
  let AvailableAppointmentsGateway;

  beforeAll(() => {
    mockGetRequest =  jest.fn().mockImplementation(({url, params}) => Promise.resolve({data: dummyData}));
    AvailableAppointmentsGateway = require('../../../api/gateways/AvailableAppointmentsGateway')(mockGetRequest);
  });

  test('api gets called appropriately', async () => {
    const result = await AvailableAppointmentsGateway({
      repairType,
      repairLocation,
      repairProblem,
      repairIssue,
      locationId,
      fromDate
    });

    expect(mockGetRequest).toHaveBeenCalledWith(
      {
        uri:  '/Appointments/Available' + repairType + 'Appointments',
        params: {
          fromDate: fromDate,
          repairIssue: repairIssue,
          repairLocation: repairLocation,
          repairProblem: repairProblem,
          locationId: locationId
        }
      }
    )
    expect(result).toEqual(dummyData)
  });
});
