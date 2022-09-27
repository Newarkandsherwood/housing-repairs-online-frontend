
module.exports = makeGetRequest => {
  return async (emergencyValue, notEligibleNonEmergencyValue, unableToBookValue, contactUsValue) => {
    let result;
    result = await makeGetRequest({
      uri: `/repairTriage?emergencyValue=${emergencyValue}&notEligibleNonEmergencyValue=${notEligibleNonEmergencyValue}&unableToBookValue=${unableToBookValue}&contactUsValue=${contactUsValue}`
    }).then(response => {
      return response.data;
    });

    return result;
  }};
