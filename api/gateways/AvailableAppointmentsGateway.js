module.exports = makeGetRequest => {
  return async ({repairType, repairLocation, repairProblem, repairIssue, locationId, fromDate}) => {
    let result;

    let apptURI = `/Appointments/Available${repairType}Appointments`;
    result = await makeGetRequest({
      uri: apptURI,
      params: {
        repairLocation: repairLocation,
        repairProblem: repairProblem,
        repairIssue: repairIssue,
        locationId: locationId,
        fromDate: fromDate
      }
    }).then(response => {
      return response.data;
    });

    return result;
  }
};
