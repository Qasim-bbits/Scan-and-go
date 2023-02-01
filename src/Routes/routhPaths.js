import {Receipt, DashboardOutlined, ManageSearch, PersonOffOutlined, Person} from '@mui/icons-material';

export const router = {
  login: '/',
  signUp: '/signup',
  verify: '/verify',
  reset: '/reset',
  main: '/main',
  payForParking: '/ParkingPayment',
  payAnInfraction: '/InfractionPayment',
  history: '/history',
  zone: '/zone',
  pay_ticket: '/pay_ticket',
  suite: "/suite",
  dashboard: "/suite/dashboard",
  organizations: "/suite/organizations",
  cities: "/suite/cities",
  zones: "/suite/zones",
  rates: "/suite/rates",
  users: "/suite/users",
  parkings: "/suite/parkings",
  ticket: "/suite/ticket",
  tickets_issued: "/suite/tickets_issued",
  businessPlates: "/suite/business_plates",
  visitorPlates: "/suite/visitor_pass",
  profile: "/profile",
};

export const adminRoutes = [
  {
    parent: {
      title: 'Profile',
      path: router.profile,
      icon: <Person />
    },
    child: []
  },
  {
    parent: {
      title: 'Pay for Parking',
      path: router.main,
      icon: <Receipt />
    },
    child: []
  },
  // {
  //   parent: {
  //     title: 'Pay an Infraction',
  //     path: router.payAnInfraction,
  //     icon: <LocalAtmIcon />
  //   },
  //   child: []
  // },
  {
    parent: {
      title: 'History',
      path: router.history,
      icon: <ManageSearch />
    },
    child: []
  },
  // {
  //   parent: {
  //     title: 'Work Force Managment',
  //     path: router.workforceManagement,
  //   },
  //   child: [
  //     {
  //       title: 'Manage User Profile',
  //       path: router.manageUsers,
  //     },
  //     {
  //       title: 'Create New Survey',
  //       path: router.manageUsers,
  //     },
  //     {
  //       title: 'Track Offsite User',
  //       path: router.manageUsers,
  //     },
  //     {
  //       title: 'Send Emergency Message',
  //       path: router.manageUsers,
  //     },
  //     {
  //       title: '2 Meter Checker',
  //       path: router.manageUsers,
  //     },
  //   ]
  // },
  // {
  //   parent: {
  //     title: 'Asset Tracking System',
  //     path: router.manageUsers,
  //   },
  //   child: [
  //     {
  //       title: 'Add new Items',
  //       path: router.manageUsers,
  //     },
  //     {
  //       title: 'Total Items Out',
  //       path: router.manageUsers,
  //     },
  //     {
  //       title: 'Total Items Returned',
  //       path: router.manageUsers,
  //     },
  //     {
  //       title: 'Manage Categories',
  //       path: router.manageUsers,
  //     },
  //     {
  //       title: 'Manage Sub Categories',
  //       path: router.manageUsers,
  //     },
  //   ]
  // },
  // {
  //   parent: {
  //     title: 'Delivery Management',
  //     path: router.manageUsers,
  //   },
  //   child: [
  //     {
  //       title: 'Add New Service Area',
  //       path: router.manageUsers,
  //     },
  //     {
  //       title: 'Active Deliveries',
  //       path: router.manageUsers,
  //     },
  //     {
  //       title: 'Cancelled Deliveries',
  //       path: router.manageUsers,
  //     },
  //     {
  //       title: 'Completed Deliveries',
  //       path: router.manageUsers,
  //     },
  //     {
  //       title: 'Settings',
  //       path: router.manageUsers,
  //     },
  //   ]
  // },
  // {
  //   parent: {
  //     title: 'Visitor Management',
  //     path: router.manageUsers,
  //   },
  //   child: [
  //     {
  //       title: 'Add New Permits',
  //       path: router.manageUsers,
  //     },
  //     {
  //       title: 'Active Permits',
  //       path: router.manageUsers,
  //     },
  //     {
  //       title: 'Rates',
  //       path: router.manageUsers,
  //     },
  //     {
  //       title: 'Locations',
  //       path: router.manageUsers,
  //     },
  //     {
  //       title: 'Organizations',
  //       path: router.manageUsers,
  //     },
  //   ]
  // }
]