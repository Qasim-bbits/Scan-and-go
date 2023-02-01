import React from 'react'
import { Routes, Route, Navigate  } from 'react-router-dom'
import './App.css'
import {router} from './Routes/routhPaths';
import LoginUtils from './Screens/Auth/Login/login.utils';
import MainUtils from './Screens/User/Main/Main.utils';
import SignupUtils from './Screens/Auth/SignUp/signUp.utils';
import VerifyUtils from './Screens/Auth/Verify/verify.utils';
import QRCodeUtils from './Screens/User/QRCode/QRCode.utils';
import ForgetPasswordUtils from './Screens/Auth/ForgetPassword/ForgetPassword.utils';
import HistoryUtils from './Screens/User/History/History.utils';
import MenuBar from "./layout/MenuBar";
import Dashboard from "./Screens/Admin/Dashboard/Dashboard";
import RatesUtils from "./Screens/Admin/Rates/RatesUtils";
import UsersUtils from "./Screens/Admin/Users/UsersUtils";
import ParkingsUtils from "./Screens/Admin/Parkings/ParkingsUtils";
import PlatesUtils from "./Screens/Admin/Plates/PlatesUtils";
import VisitorPlatesUtils from "./Screens/Admin/VisitorPlates/VisitorPlatesUtils";
import ProfileUtils from './Screens/User/Profile/Profile.utils';
import Cities from './Screens/Admin/Cities/Cities';
import Zones from './Screens/Admin/Zones/Zones';
import Ticket from './Screens/Admin/Ticket/Ticket';
import TicketIssued from './Screens/Admin/TicketIssued/TicketIssued';
import PayTicket from './Screens/User/PayTicket/PayTicket';
import Organizations from './Screens/Admin/Organization/Organizations';

const App = () => {
  const PrivateRoute = ({ children}) => {
    const user = JSON.parse(sessionStorage.getItem('userLogged'));
    if(user !== null){
      return children
    }
      
    return <Navigate to={router.login} />
  }
  const AdminRoute = ({ children}) => {
    const isAdmin = JSON.parse(sessionStorage.getItem('userLogged'));
    if(isAdmin !== null){
      if (isAdmin.result.role === 'admin' ) {
        return children
      }
    }

    return <Navigate to={'/'} />
  }
  function MissingRoute() {
    return <Navigate to={{pathname: router.main}} />
  }

  return (
    <Routes>
        <Route exact path={router.login} element={<LoginUtils/>}/>
        <Route exact path={router.signUp} element={<SignupUtils/>}/>
        <Route exact path={router.reset} element={<ForgetPasswordUtils/>}/>
        <Route exact path={router.pay_ticket} element={<PayTicket/>}/>
        <Route exact path={router.verify+'/:token'} element={<VerifyUtils/>}/>
        <Route exact path={router.history} element={
          <PrivateRoute>
            <HistoryUtils/>
          </PrivateRoute>}
        />
        <Route exact path={router.main} element={
          <PrivateRoute>
            <MainUtils/>
          </PrivateRoute>}
        />
        <Route exact path={router.profile} element={
          <PrivateRoute>
            <ProfileUtils/>
          </PrivateRoute>}
        />
        <Route exact path={router.zone+'/:id'} element={<QRCodeUtils/>}/>
        <Route path={router.admin} element={
        <AdminRoute>
          <MenuBar />
        </AdminRoute>
        }>
          <Route exact path={router.dashboard} element={<Dashboard />} />
          <Route exact path={router.organizations} element={<Organizations />} />
          <Route exact path={router.cities} element={<Cities />} />
          <Route exact path={router.rates} element={<RatesUtils />} />
          <Route exact path={router.users} element={<UsersUtils />} />
          <Route exact path={router.zones} element={<Zones />} />
          <Route exact path={router.ticket} element={<Ticket />} />
          <Route exact path={router.tickets_issued} element={<TicketIssued />} />
          <Route exact path={router.businessPlates} element={<PlatesUtils />} />
          <Route exact path={router.parkings+"/:id"} element={<ParkingsUtils />} />
        </Route>
        <Route path={router.admin} element={
          <MenuBar />
        }>
          <Route exact path={router.visitorPlates+"/:id"} element={<VisitorPlatesUtils />} />
        </Route>
        <Route path="*" element={<MissingRoute/>} />
    </Routes>
  );
}

export default App;