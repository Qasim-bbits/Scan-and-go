import AxiosServices from './axios-service';
import {endpoints} from './api-end-points';

export class CommonService {

  get_record(body){    
    const res = AxiosServices.post(endpoints.common.get_record, body);
    return res;
  }

  get_record_by_id(body){    
    const res = AxiosServices.post(endpoints.common.get_record_by_id, body);
    return res;
  }

  save_record(body){    
    const res = AxiosServices.post(endpoints.common.save_record, body);
    return res;
  }

  del_record(body){    
    const res = AxiosServices.post(endpoints.common.del_record, body);
    return res;
  }

  edit_record(body){    
    const res = AxiosServices.post(endpoints.common.edit_record, body);
    return res;
  }

  get_record_by_column(body){    
    const res = AxiosServices.post(endpoints.common.get_record_by_column, body);
    return res;
  }

  sendMail(body){
    const res = AxiosServices.post(endpoints.common.sendMail, body);
    return res;
  }

}
const commonService = new CommonService();
export default commonService;
