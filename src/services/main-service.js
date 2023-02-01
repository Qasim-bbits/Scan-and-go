import AxiosServices from './axios-service';
import {endpoints} from './api-end-points';

export class MainService {

  getCities(){
    const res = AxiosServices.get(endpoints.main.getCities);
    return res;
  }

  getZonesById(body){
    const res = AxiosServices.post(endpoints.main.getZonesById, body);
    return res;
  }

  getPlatesByUser(body){
    const res = AxiosServices.post(endpoints.main.getPlatesByUser, body);
    return res;
  }

  addPlate(body){
    const res = AxiosServices.post(endpoints.main.addPlate, body);
    return res;
  }

  delPlate(body){
    const res = AxiosServices.post(endpoints.main.delPlate, body);
    return res;
  }

  editPlate(body){
    const res = AxiosServices.post(endpoints.main.editPlate, body);
    return res;
  }

  getRateById(body){
    const res = AxiosServices.post(endpoints.main.getRateById, body);
    return res;
  }

  getQRRateById(body){
    const res = AxiosServices.post(endpoints.main.getQRRateById, body);
    return res;
  }

  getRateSteps(body){
    const res = AxiosServices.post(endpoints.main.getRateSteps, body);
    return res;
  }

  getZonebyId(body){
    const res = AxiosServices.post(endpoints.main.getZonebyId, body);
    return res;
  }

  emailReciept(body){
    const res = AxiosServices.post(endpoints.main.emailReciept, body);
    return res;
  }

  getUserHistory(body){
    const res = AxiosServices.post(endpoints.main.getUserHistory, body);
    return res;
  }

  getZones(){
    const res = AxiosServices.get(endpoints.main.getZones);    
    return res;
  }

  getUserProfile(body){
    const res = AxiosServices.post(endpoints.main.getUserProfile,body);
    return res;
  }

  editProfile(body){
    const res = AxiosServices.post(endpoints.main.editProfile,body);
    return res;
  }

  getCurrentParking(body){
    const res = AxiosServices.post(endpoints.main.getCurrentParking,body);
    return res;
  }

  getCurrentParkingsByPlate(body){
    const res = AxiosServices.post(endpoints.main.getCurrentParkingsByPlate,body);
    return res;
  }

}
const mainService = new MainService();
export default mainService;
