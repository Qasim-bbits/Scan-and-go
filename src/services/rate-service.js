import AxiosServices from './axios-service';
import {endpoints} from './api-end-points';

export class RateServices {  

  getRateDetail(body){    
    const res = AxiosServices.post(endpoints.rate.getRateDetail, body);    
    return res;
  }

  getRateByZone(body){    
    const res = AxiosServices.post(endpoints.rate.getRateByZone, body);    
    return res;
  }

  editRateType(body){    
    const res = AxiosServices.post(endpoints.rate.editRateType, body);    
    return res;
  }

  bulkEditSteps(body){    
    const res = AxiosServices.post(endpoints.rate.bulkEditSteps, body);    
    return res;
  }

  addCompleteRate(body){    
    const res = AxiosServices.post(endpoints.rate.addCompleteRate, body);    
    return res;
  }

  addSpecialRate(body){
    const res = AxiosServices.post(endpoints.rate.addSpecialRate, body);    
    return res;
  }

  delRateType(body){
    const res = AxiosServices.post(endpoints.rate.delRateType, body);    
    return res;
  }
}
const rateServices = new RateServices();
export default rateServices;
