import dummyData from '../../fixtures/communalRepairs.json'

describe('GetCommunalPropertyRepairsGateway', () => {
  let mockGetRequest;
  let CommunalPropertyRepairsGateway;

  beforeAll(() => {
    mockGetRequest =  jest.fn().mockImplementation(({url, params}) => Promise.resolve({data: dummyData}));
    CommunalPropertyRepairsGateway = require('../../../api/gateways/CommunalPropertyRepairsGateway')(mockGetRequest);
  });

  test('api gets called appropriately', async () => {
    const result = await CommunalPropertyRepairsGateway('locationId');

    expect(mockGetRequest).toHaveBeenCalledWith(
      {
        uri:  '/CommunalPropertyRepairs?propertyReference=locationId',
      }
    )
    expect(result).toEqual(dummyData)
  });
});
