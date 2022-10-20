
module.exports = makePostRequest => {
  return async (body, repairType) => {
    let result;
    
    let repairURI = '/repair/' + repairType + 'Repair';
    result = await makePostRequest({
      uri: repairURI,
      body
    }).then(response => {
      return response.data;
    });

    return result;
  }
};
