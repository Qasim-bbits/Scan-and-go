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
  },

  ///---Home service--///

  home : {
      getHomeRecord : config.url.API_URL + 'getHomeRecord',
      getProductByCat : config.url.API_URL + 'getProductByCat',
      getCollectionsByCat : config.url.API_URL + 'getCollectionsByCat',
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