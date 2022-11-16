module.exports = makeGetRequest => {
  return async(propertyReference) => {
    let result;
    result = await makeGetRequest({
      uri: `/repair/CommunalPropertyRepairs?propertyReference=${propertyReference}`
    }).then(response => {
      return response.data;
    });

    return result;
  }};
