
module.exports = makeGetRequest => {
  return async (postcode, isCommunal) => {
    var result;
    result = await makeGetRequest({
      uri: isCommunal === "no" ?`/Addresses/TenantAddresses?postcode=${postcode}` : `/Addresses/CommunalAddresses?postcode=${postcode}`
    }).then(response => {
      return response.data;
    });

    return result;
  }};
