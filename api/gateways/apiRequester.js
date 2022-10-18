require('dotenv').config()

module.exports = axios => {
  return {
    makeGetRequest: ({uri, params ={}}) =>{
      var identifier = process.env.NODE_ENV === 'production' ? process.env.REPAIRS_API_IDENTIFIER : process.env.REPAIRS_API_IDENTIFIER_STAGING
      var baseUrl = process.env.NODE_ENV === 'production' ? process.env.REPAIRS_API_BASE_URL: process.env.REPAIRS_API_BASE_URL_STAGING;
      const axiosInstance = axios.create({
        baseURL: baseUrl
      })
      return axiosInstance.post(`/authentication?identifier=${identifier}`)
        .then(response => {
          var jwt = response.data;
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
          return axiosInstance.get(uri, {
            params: params
          });
        })
    },

    makePostRequest: ({uri, body ={}}) =>{
      var identifier = process.env.NODE_ENV === 'production' ? process.env.REPAIRS_API_IDENTIFIER : process.env.REPAIRS_API_IDENTIFIER_STAGING
      var baseUrl = process.env.NODE_ENV === 'production' ? process.env.REPAIRS_API_BASE_URL: process.env.REPAIRS_API_BASE_URL_STAGING;
      const axiosInstance = axios.create({
        baseURL: baseUrl
      })
      return axiosInstance.post(`/authentication?identifier=${identifier}`)
        .then(response => {
          var jwt = response.data;
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
          return axiosInstance.post(uri, body);
        })
    }
  }
}
