import { config } from '../Constants';
export const endpoints = {

  ///---Common service--///

  common : {
    get_record : config.url.API_URL + 'get_record',
    save_record : config.url.API_URL + 'save_record',
    edit_record : config.url.API_URL + 'edit_record',
    del_record : config.url.API_URL + 'del_record',
    get_record_by_id : config.url.API_URL + 'get_record_by_id',
    sendMail : config.url.API_URL + 'sendMail',
  },
  
  ///---Login service--///

  auth : {
      signup : config.url.API_URL + 'signup',
      login : config.url.API_URL + 'login',
      resetPassword : config.url.API_URL + 'resetPassword',
      verify : config.url.API_URL + 'verify',
      adminLogin : config.url.API_URL + 'adminLogin',
      editPassword : config.url.API_URL + 'editPassword',
      forgetPassword : config.url.API_URL + 'forgetPassword',
      changePassword : config.url.API_URL + 'changePassword',
  },

  ///---Home service--///

  main : {
      getCities : config.url.API_URL + 'getCities',
      getZonesById : config.url.API_URL + 'getZonesById',
      getPlatesByUser : config.url.API_URL + 'getPlatesByUser',
      addPlate : config.url.API_URL + 'addPlate',
      delPlate : config.url.API_URL + 'delPlate',
      editPlate : config.url.API_URL + 'editPlate',
      getRateById : config.url.API_URL + 'getRateById',
      getRateSteps : config.url.API_URL + 'getRateSteps',
      getZonebyId : config.url.API_URL + 'getZonebyId',
      getQRRateById : config.url.API_URL + 'getQRRateById',
      emailReciept : config.url.API_URL + 'emailReciept',
  },

  ///---Category service--///

  dashboard : {
    getDashboard : config.url.API_URL + 'getDashboard',
    addDashboard : config.url.API_URL + 'addDashboard',
    editDashboard : config.url.API_URL + 'editDashboard',
  },

  ///---Parking service--///

  parking : {
    buyParking : config.url.API_URL + 'buyParking',
  }

}