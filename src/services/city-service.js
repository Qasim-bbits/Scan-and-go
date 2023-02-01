import AxiosServices from './axios-service';
import {endpoints} from './api-end-points';

export class CityServices {  

  addCity(body){    
    const res = AxiosServices.post(endpoints.city.addCity, body);    
    return res;
  }

  editCity(body){    
    const res = AxiosServices.post(endpoints.city.editCity, body);    
    return res;
  }

  delCity(body){    
    const res = AxiosServices.post(endpoints.city.delCity, body);    
    return res;
  }

  addZone(body){    
    const res = AxiosServices.post(endpoints.city.addZone, body);    
    return res;
  }

  getCities(){
    const res = AxiosServices.get(endpoints.city.getCities);    
    return res;
  }

  getZones(){
    const res = AxiosServices.get(endpoints.city.getZones);    
    return res;
  }

  editZone(body){
    const res = AxiosServices.post(endpoints.city.editZone,body);    
    return res;
  }

  delZone(body){
    const res = AxiosServices.post(endpoints.city.delZone,body);    
    return res;
  }

  getVisitorZone(body){
    const res = AxiosServices.post(endpoints.city.getVisitorZone,body);    
    return res;
  }
}
const cityServices = new CityServices();
export default cityServices;
