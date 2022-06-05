import { config } from '../Constants';
export const endpoints = {

  ///---Dashboard service--///

  dashboard : {
    getDashboard : config.url.API_URL + 'getDashboard',
    addDashboard : config.url.API_URL + 'addDashboard',
    editDashboard : config.url.API_URL + 'editDashboard',
  },
}