
module.exports = makeGetRequest => {
  return async (emergencyValue, notEligibleNonEmergencyValue) => {
    var result = await makeGetRequest({
      uri: `/configuration?emergencyValue=${emergencyValue}&notEligibleNonEmergencyValue=${notEligibleNonEmergencyValue}`
    }).then(response => {
      return response.data;
    });

    return result;
  }};
