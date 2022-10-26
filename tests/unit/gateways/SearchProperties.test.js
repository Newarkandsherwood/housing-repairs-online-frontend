describe('SearchProperties', () => {
  const postcode = 'M3 0W'
  const dummyData = {postcode: postcode}
  let SearchPropertiesGateway;
  let mockGetRequest;

  describe('when api is up', () => {
    beforeAll(() => {
      mockGetRequest =  jest.fn().mockImplementation(({url, params}) => Promise.resolve({data: dummyData}));
      SearchPropertiesGateway = require('../../../api/gateways/SearchPropertiesGateway')(mockGetRequest);
    });

    test('api gets called appropriately for tenant addresses', async () => {
      const result = await SearchPropertiesGateway(postcode, "no");

      expect(mockGetRequest).toHaveBeenCalledWith(
        {uri: `/Addresses/TenantAddresses?postcode=${postcode}`}
      )

      expect(result).toEqual(dummyData)
    });

    test('api gets called appropriately for communal addresses', async () => {
      const result = await SearchPropertiesGateway(postcode, "yes");

      expect(mockGetRequest).toHaveBeenCalledWith(
        {uri: `/Addresses/CommunalAddresses?postcode=${postcode}`}
      )

      expect(result).toEqual(dummyData)
    });
  });

});
