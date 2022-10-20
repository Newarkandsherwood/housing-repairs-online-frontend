describe('SaveRepairGateway', () => {
  const repairLocation = 'Kitchen'
  const repairProblem = 'Cupboards, including damaged cupboard doors'
  const repairIssue = 'Missing door'
  const locationId = '100023336956'
  const dummyID = 'ABCD1234';
  const repairType = 'Tenant';

  let mockPostRequest;
  let SaveRepairGateway;

  beforeAll(() => {
    mockPostRequest =  jest.fn().mockImplementation(({url, params}) => Promise.resolve({data: dummyID}));
    SaveRepairGateway = require('../../../api/gateways/SaveRepairGateway')(mockPostRequest);
  });

  test('api gets called appropriately', async () => {
    const result = await SaveRepairGateway({
      repairLocation,
      repairProblem,
      repairIssue,
      locationId
    }, 'Tenant');

    expect(mockPostRequest).toHaveBeenCalledWith(
      {
        uri:  '/repair/TenantRepair',
        body: {
          repairIssue: repairIssue,
          repairLocation: repairLocation,
          repairProblem: repairProblem,
          locationId: locationId
        }
      }
    )
    expect(result).toEqual(dummyID)
  });
});
