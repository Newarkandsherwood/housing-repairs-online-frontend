require('dotenv').config()

module.exports = axios => {
  return {
    makeGetRequest: ({uri, params ={}}) =>{
      const axiosInstance = axios.create({
        baseURL: process.env.REPAIRS_API_BASE_URL
      })
      return axiosInstance.post(`/authentication?identifier=${process.env.REPAIRS_API_IDENTIFIER}`)
        .then(response => {
          var jwt = response.data;
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
          return axiosInstance.get(uri, {
            params: params
          });
        })
    },

    makePostRequest: ({uri, body ={}}) =>{
      const axiosInstance = axios.create({
        baseURL: process.env.REPAIRS_API_BASE_URL
      })
      return axiosInstance.post(`/authentication?identifier=${process.env.REPAIRS_API_IDENTIFIER}`)
        .then(response => {
          var jwt = response.data;
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
          return axiosInstance.post(uri, body);
        })
    }
  }
}
