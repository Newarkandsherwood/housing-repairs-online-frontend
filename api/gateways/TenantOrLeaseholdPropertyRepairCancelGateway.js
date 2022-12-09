module.exports = makeGetRequest => {
  return async(postcode, repairId) => {
    let result;
    result = await makeGetRequest({
      uri: `/repair/TenantOrLeaseholdPropertyRepairCancel?postcode=${postcode}&repairId=${repairId}`
    }).then(response => {
      return response.data;
    });

    return result;
  }};
