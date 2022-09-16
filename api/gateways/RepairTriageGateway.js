
module.exports = makeGetRequest => {
  return async (emergencyValue, notEligibleNonEmergencyValue, unableToBookValue) => {
    let result;
    result = await makeGetRequest({
      uri: `/repairTriage?emergencyValue=${emergencyValue}&notEligibleNonEmergencyValue=${notEligibleNonEmergencyValue}&unableToBookValue=${unableToBookValue}`
    }).then(response => {
      return response.data;
    });

    return result;
  }};
