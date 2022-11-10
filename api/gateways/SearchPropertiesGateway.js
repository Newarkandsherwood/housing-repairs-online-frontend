
module.exports = makeGetRequest => {
  return async (postcode, repairType) => {
    var result;
    result = await makeGetRequest({
      uri: `/Addresses/${repairType}Addresses?postcode=${postcode}`
    }).then(response => {
      return response.data;
    });

    return result;
  }};
