import dummyData from '../../fixtures/communalRepairs.json'

describe('GetCommunalPropertyRepairsGateway', () => {
  let mockGetRequest;
  let GetCommunalPropertyRepairsGateway;

  beforeAll(() => {
    mockGetRequest =  jest.fn().mockImplementation(({url, params}) => Promise.resolve({data: dummyData}));
    GetCommunalPropertyRepairsGateway = require('../../../api/gateways/GetCommunalPropertyRepairsGateway')(mockGetRequest);
  });

  test('api gets called appropriately', async () => {
    const result = await GetCommunalPropertyRepairsGateway('locationId');

    expect(mockGetRequest).toHaveBeenCalledWith(
      {
        uri:  '/CommunalPropertyRepairs?propertyReference=locationId',
      }
    )
    expect(result).toEqual(dummyData)
  });
});
