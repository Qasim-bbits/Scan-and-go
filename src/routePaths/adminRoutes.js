import { DashboardOutlined, Inventory2Outlined } from '@mui/icons-material';
import router from './routePaths';

const adminRoutes = [
    {
        path: router.dashboard,
        icon: <DashboardOutlined/>,
        value: 'Dasboard',
    },
    {
        path: router.products,
        icon: <Inventory2Outlined/>,
        value: 'Products',
    },
];
  
export default adminRoutes;