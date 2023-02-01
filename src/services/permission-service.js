import AxiosServices from './axios-service';
import {endpoints} from './api-end-points';

export class PermissionServices {

  getAgentPermissions(body){    
    const res = AxiosServices.post(endpoints.permission.getAgentPermissions, body);    
    return res;
  }

}
const permissionServices = new PermissionServices();
export default permissionServices;
