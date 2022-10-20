
module.exports = makeGetRequest => {
  return async (repairType, emergencyValue, notEligibleNonEmergencyValue, unableToBookValue, contactUsValue) => {
    let result;
    result = await makeGetRequest({
      uri: `/repairTriage/${repairType}RepairTriageOptions?emergencyValue=${emergencyValue}&notEligibleNonEmergencyValue=${notEligibleNonEmergencyValue}&unableToBookValue=${unableToBookValue}&contactUsValue=${contactUsValue}`
    }).then(response => {
      return response.data;
    });

    return result;
  }};
