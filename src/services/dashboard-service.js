import AxiosServices from './axios-service';
import {endpoints} from './api-end-points';

export class DashboardService {

  getDashboard(){    
    const res = AxiosServices.get(endpoints.dashboard.getDashboard);
    return res;
  }

}
const dashboardService = new DashboardService();
export default dashboardService;
