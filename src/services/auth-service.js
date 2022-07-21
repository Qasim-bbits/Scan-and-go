import AxiosServices from './axios-service';
import {endpoints} from './api-end-points';

export class AuthServices {  

  signup(body){    
    const res = AxiosServices.post(endpoints.auth.signup, body);
    return res;
  }

  verify(body){    
    const res = AxiosServices.post(endpoints.auth.verify, body);
    return res;
  }

  login(body){    
    const res = AxiosServices.post(endpoints.auth.login, body);    
    return res;
  }

  resetPassword(body){    
    const res = AxiosServices.post(endpoints.auth.resetPassword, body);    
    return res;
  }

  adminLogin(body){    
    const res = AxiosServices.post(endpoints.auth.adminLogin, body);    
    return res;
  }

  editPassword(body){
    const res = AxiosServices.post(endpoints.auth.editPassword, body);    
    return res;
  }

  forgetPassword(body){
    const res = AxiosServices.post(endpoints.auth.forgetPassword, body);    
    return res;
  }

  changePassword(body){
    const res = AxiosServices.post(endpoints.auth.changePassword, body);    
    return res;
  }

}
const authServices = new AuthServices();
export default authServices;
