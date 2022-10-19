
module.exports = makePostRequest => {
  return async (body) => {
    let result;
    let repairURI = '/repair/Repair' + body.repairType;
    result = await makePostRequest({
      uri: repairURI,
      body
    }).then(response => {
      return response.data;
    });

    return result;
  }
};
