import { 
  DashboardOutlined, DirectionsCar, BackupTableOutlined, Public, MapOutlined, Inventory2Outlined, Business, ConfirmationNumberOutlined
} from "@mui/icons-material";
import {router} from "./routhPaths";

const adminRoutes = [
  {
    path: router.dashboard,
    icon: <DashboardOutlined />,
    value: "Dashboard",
  },
  {
    path: router.main,
    icon: <Public />,
    value: "Web App",
  },
  // {
  //   path: router.organizations,
  //   icon: <Business />,
  //   value: "Manage Organizations",
  // },
  // {
  //   path: router.cities,
  //   icon: <MapOutlined />,
  //   value: "Manage Cities",
  // },
  // {
  //   path: router.zones,
  //   icon: <Inventory2Outlined />,
  //   value: "Manage Zones",
  // },
  // {
  //   path: router.rates,
  //   icon: <BackupTableOutlined />,
  //   value: "Manage Rates",
  // },
  {
    path: router.users,
    icon: <BackupTableOutlined />,
    value: "Manage Users",
  },
  // {
  //   path: router.businessPlates,
  //   icon: <DirectionsCar />,
  //   value: "Business Plates",
  // },
  {
    path: router.parkings+"/all",
    icon: <DirectionsCar />,
    value: "Parkings",
  },
  {
    path: router.ticket,
    icon: <ConfirmationNumberOutlined />,
    value: "Manage Tickets",
  },
  {
    path: router.tickets_issued,
    icon: <ConfirmationNumberOutlined />,
    value: "Tickets Issued",
  },
];

export default adminRoutes;
