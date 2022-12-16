module.exports = makePostRequest => {
  return async (body, postcode, repairId) => {
    let result;
    let repairURI = `/repair/tenantOrLeaseholdPropertyRepairChangeAppointmentSlot?postcode=${postcode}&repairId=${repairId}`;
    result = await makePostRequest({
      uri: repairURI,
      body: body
    }).then(response => {
      return response.data;
    });

    return result;
  }
};
