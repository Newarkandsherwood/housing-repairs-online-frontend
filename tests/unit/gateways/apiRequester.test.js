describe('apiRequester', () => {
  let apiRequester;
  let mockedPost;
  let mockedGet;
  let mockedCreate;
  const api_url = 'https://repairs.api'
  const api_identifier = 'magic key';
  const api_url_staging = 'https://repairs.api.staging'
  const api_identifier_staging = 'magic key staging';
  let mockedAxiosInstance;
  const jwt = '~~~jwt~~~';
  const uri = '/request/uri/'
  const params = {
    a: 1, b: 2
  }

  describe('when api is up', () => {
    beforeAll(() => {
      process.env.REPAIRS_API_BASE_URL = api_url
      process.env.REPAIRS_API_IDENTIFIER = api_identifier
      process.env.REPAIRS_API_BASE_URL_STAGING = api_url_staging
      process.env.REPAIRS_API_IDENTIFIER_STAGING = api_identifier_staging
      process.env.NODE_ENV = 'production'

      mockedPost = jest.fn().mockImplementation(() => Promise.resolve({data: jwt}));
      mockedGet = jest.fn().mockImplementation();
      mockedAxiosInstance = {
        post: mockedPost,
        get: mockedGet,
        defaults: {
          headers: {
            common: {}
          }
        }
      }
      mockedCreate = jest.fn(()=>{return mockedAxiosInstance});

      const mockAxios = {
        create: mockedCreate
      }

      apiRequester = require('../../../api/gateways/apiRequester')(mockAxios);
    });

    test('a get request is made with headers', async () => {

      await apiRequester.makeGetRequest({uri, params});

      expect(mockedPost).toHaveBeenCalledWith(
        `/authentication?identifier=${api_identifier}`
      )

      expect(mockedAxiosInstance.defaults.headers.common['Authorization']).toEqual(`Bearer ${jwt}`);

      expect(mockedGet).toHaveBeenCalledWith(uri, {'params': params})

    });


    test('axios create is called with correct base url for production', async () => {
      process.env.NODE_ENV = 'production'
      await apiRequester.makeGetRequest({uri, params});
      expect(mockedCreate).toHaveBeenCalledWith({"baseURL": `https://repairs.api`})
    });

    test('axios create is called with correct base url for staging', async () => {
      process.env.NODE_ENV = 'staging'
      await apiRequester.makeGetRequest({uri, params});
      expect(mockedCreate).toHaveBeenCalledWith({"baseURL": `https://repairs.api.staging`})
    });

    test('a get request is made with staging identifier', async () => {

      process.env.NODE_ENV = 'staging'
      await apiRequester.makeGetRequest({uri, params});

      expect(mockedPost).toHaveBeenCalledWith(
        `/authentication?identifier=${api_identifier_staging}`
      )

      expect(mockedAxiosInstance.defaults.headers.common['Authorization']).toEqual(`Bearer ${jwt}`);

      expect(mockedGet).toHaveBeenCalledWith(uri, {'params': params})

    });    

    test('a post request is made with headers', async () => {
      const body = {
        a: 1, b: 2
      }
      process.env.NODE_ENV = 'production'
      await apiRequester.makePostRequest({uri, body});

      expect(mockedPost).toHaveBeenNthCalledWith(1, `/authentication?identifier=${api_identifier}`);

      expect(mockedAxiosInstance.defaults.headers.common['Authorization']).toEqual(`Bearer ${jwt}`);

      expect(mockedPost).toHaveBeenNthCalledWith(2, uri, body);
    });
  });
});
