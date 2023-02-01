import AxiosServices from './axios-service';
import {endpoints} from './api-end-points';

export class OrganizationServices {  

  addOrganization(body){    
    const res = AxiosServices.post(endpoints.organization.addOrganization, body);    
    return res;
  }

  editOrganization(body){    
    const res = AxiosServices.post(endpoints.organization.editOrganization, body);    
    return res;
  }

  delOrganization(body){    
    const res = AxiosServices.post(endpoints.organization.delOrganization, body);    
    return res;
  }

  getOrganizations(){
    const res = AxiosServices.get(endpoints.organization.getOrganizations);    
    return res;
  }
}
const organizationServices = new OrganizationServices();
export default organizationServices;
