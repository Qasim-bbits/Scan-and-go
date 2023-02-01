import AxiosServices from './axios-service';
import {endpoints} from './api-end-points';

export class UserServices {  

  getUsers(){    
    const res = AxiosServices.get(endpoints.user.getUsers);    
    return res;
  }

  delItem(body){    
    const res = AxiosServices.post(endpoints.user.delItem,body);    
    return res;
  }

  addUser(body){    
    const res = AxiosServices.post(endpoints.user.addUser,body);    
    return res;
  }

  editUser(body){    
    const res = AxiosServices.post(endpoints.user.editUser,body);    
    return res;
  }

}
const userServices = new UserServices();
export default userServices;
