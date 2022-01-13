// import SearchPropertiesGateway from './SearchPropertiesGateway';
// import AvailableAppointmentsGateway from './AvailableAppointmentsGateway';
const axios = require('axios');

const apiRequester = require('./apiRequester')(axios);

const searchPropertiesGateway = require('./SearchPropertiesGateway')(apiRequester.makeGetRequest);

module.exports = {
  searchPropertiesGateway,
  // AvailableAppointmentsGateway
};
