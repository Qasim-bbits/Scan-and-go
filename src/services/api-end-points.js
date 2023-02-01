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
      getUserHistory : config.url.API_URL + 'getUserHistory',
      getZones : config.url.API_URL + 'getZones',
      getUserProfile : config.url.API_URL + 'getUserProfile',
      editProfile : config.url.API_URL + 'editProfile',
      getCurrentParkingsByPlate : config.url.API_URL + 'getCurrentParkingsByPlate',
      getCurrentParking : config.url.API_URL + 'getCurrentParking',
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
    getParkings : config.url.API_URL + 'getParkings',
  },

  ///---User service--///

  user : {
    getUsers : config.url.API_URL + 'getUsers',
    delItem : config.url.API_URL + 'delItem',
    addUser : config.url.API_URL + 'addUser',
    editUser : config.url.API_URL + 'editUser',
  },

  ///---Plates service--///
  
  plates : {
    getBusinessPlate : config.url.API_URL + 'getBusinessPlate',
    addBusinessPlate : config.url.API_URL + 'addBusinessPlate',
    delBusinessPlate : config.url.API_URL + 'delBusinessPlate',
  },

  ///---City and Zone service--///

  city : {
    addCity : config.url.API_URL + 'addCity',
    editCity : config.url.API_URL + 'editCity',
    delCity : config.url.API_URL + 'delCity',
    addZone : config.url.API_URL + 'addZone',
    getCities : config.url.API_URL + 'getCities',
    getZones : config.url.API_URL + 'getZones',
    editZone : config.url.API_URL + 'editZone',
    delZone : config.url.API_URL + 'delZone',
    getVisitorZone : config.url.API_URL + 'getVisitorZone',
  },

  ///---Rate service--///

  rate : {
    getRateDetail : config.url.API_URL + 'getRateDetail',
    editRateType : config.url.API_URL + 'editRateType',
    bulkEditSteps : config.url.API_URL + 'bulkEditSteps',
    addCompleteRate : config.url.API_URL + 'addCompleteRate',
    addSpecialRate : config.url.API_URL + 'addSpecialRate',
    getRateByZone : config.url.API_URL + 'getRateByZone',
    delRateType : config.url.API_URL + 'delRateType',
  },

  ///---Organization service--///

  organization : {
    addOrganization : config.url.API_URL + 'addOrganization',
    editOrganization : config.url.API_URL + 'editOrganization',
    delOrganization : config.url.API_URL + 'delOrganization',
    getOrganizations : config.url.API_URL + 'getOrganizations',
  },

  ///---Ticket service--///

  ticket : {
    addTicket : config.url.API_URL + 'addTicket',
    editTicket : config.url.API_URL + 'editTicket',
    delTicket : config.url.API_URL + 'delTicket',
    getTickets : config.url.API_URL + 'getTickets',
    getAgingByTicket : config.url.API_URL + 'getAgingByTicket',
    getTicketsIssued : config.url.API_URL + 'getTicketsIssued',
    editIssueTicket : config.url.API_URL + 'editIssueTicket',
    searchTicket : config.url.API_URL + 'searchTicket',
    payTicket : config.url.API_URL + 'payTicket',
  },

  ///---Permissions service--///

  permission : {
    getAgentPermissions : config.url.API_URL + 'getAgentPermissions',
  },

}