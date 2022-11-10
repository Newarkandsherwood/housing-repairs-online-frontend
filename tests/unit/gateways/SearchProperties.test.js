describe('SearchProperties', () => {
  const postcode = 'M3 0W'
  const dummyData = {postcode: postcode}
  let SearchPropertiesGateway;
  let mockGetRequest;

  const testApiGetsCalledAppropriatelyForRepairType = async (repairType) => {
    const result = await SearchPropertiesGateway(postcode, repairType);

    expect(mockGetRequest).toHaveBeenCalledWith(
      {uri: `/Addresses/${repairType}Addresses?postcode=${postcode}`}
    )

    expect(result).toEqual(dummyData)
  }

  describe('when api is up', () => {
    beforeAll(() => {
      mockGetRequest =  jest.fn().mockImplementation(({url, params}) => Promise.resolve({data: dummyData}));
      SearchPropertiesGateway = require('../../../api/gateways/SearchPropertiesGateway')(mockGetRequest);
    });

    test('api gets called appropriately for tenant addresses', async () => {
      const repairType = 'Tenant';
      await testApiGetsCalledAppropriatelyForRepairType(repairType);
    });

    test('api gets called appropriately for communal addresses', async () => {
      const repairType = 'Communal';
      await testApiGetsCalledAppropriatelyForRepairType(repairType);
    });

    test('api gets called appropriately for leasehold addresses', async () => {
      const repairType = 'Leasehold';
      await testApiGetsCalledAppropriatelyForRepairType(repairType);
    });
  });

});
