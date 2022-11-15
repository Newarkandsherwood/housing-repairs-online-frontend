module.exports = makeGetRequest => {
  return async(propertyReference) => {
    let result;
    result = await makeGetRequest({
      uri: `/repair/CommunalPropertyRepairs?propertyReference=${propertyReference}`
    }).then(response => {
      console.log(response)
      return response.data;
    });

    return result;
  }};
