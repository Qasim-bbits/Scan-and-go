import AxiosServices from './axios-service';
import {endpoints} from './api-end-points';

export class ParkingService {

  buyParking(body){    
    const res = AxiosServices.post(endpoints.parking.buyParking, body);
    return res;
  }

  getParkings(body){
    const res = AxiosServices.post(endpoints.parking.getParkings, body);
    return res;
  }

}
const parkingService = new ParkingService();
export default parkingService;
