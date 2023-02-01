import AxiosServices from './axios-service';
import {endpoints} from './api-end-points';

export class PlateServices {  

  getBusinessPlate(){    
    const res = AxiosServices.get(endpoints.plates.getBusinessPlate);
    return res;
  }

  addBusinessPlate(body){    
    const res = AxiosServices.post(endpoints.plates.addBusinessPlate,body);
    return res;
  }

  delBusinessPlate(body){    
    const res = AxiosServices.post(endpoints.plates.delBusinessPlate,body);
    return res;
  }

}
const plateServices = new PlateServices();
export default plateServices;
