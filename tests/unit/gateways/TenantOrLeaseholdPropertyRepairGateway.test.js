import dummyData from '../../fixtures/repairAppointments.json'

describe('GetTenantOrLeaseholdPropertyRepairGateway', () => {
  let mockGetRequest;
  let TenantOrLeaseholdPropertyRepairGateway;

  beforeAll(() => {
    mockGetRequest =  jest.fn().mockImplementation(({url, params}) => Promise.resolve({data: dummyData}));
    TenantOrLeaseholdPropertyRepairGateway = require('../../../api/gateways/TenantOrLeaseholdPropertyRepairGateway')(mockGetRequest);
  });

  test('api gets called appropriately', async () => {
    const result = await TenantOrLeaseholdPropertyRepairGateway('LN1 3AT','RepairId');

    expect(mockGetRequest).toHaveBeenCalledWith(
      {
        uri:  '/repair/TenantOrLeaseholdPropertyRepair?postcode=LN1 3AT&repairId=RepairId',
      }
    )
    expect(result).toEqual(dummyData)
  });
});
