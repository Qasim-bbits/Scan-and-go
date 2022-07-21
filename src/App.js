import React from 'react'
import { Routes, Route, Navigate  } from 'react-router-dom'
import './App.css'
import {router} from './Routes/routhPaths';
import {Layout} from "./components/SidebarHeaderWrapper";
import LoginUtils from './Screens/Auth/Login/login.utils';
import MainUtils from './Screens/Main/Main.utils';
import SignupUtils from './Screens/Auth/SignUp/signUp.utils';
import VerifyUtils from './Screens/Auth/Verify/verify.utils';
import QRCodeUtils from './Screens/QRCode/QRCode.utils';
import ForgetPasswordUtils from './Screens/Auth/ForgetPassword/ForgetPassword.utils';
import HistoryUtils from './Screens/History/History.utils';

const App = () => {
  const PrivateRoute = ({ children}) => {
    const user = JSON.parse(sessionStorage.getItem('userLogged'));
    if(user !== null){
      return children
    }
      
    return <Navigate to={router.login} />
  }
  function MissingRoute() {
    return <Navigate to={{pathname: router.main}} />
  }

  return (
    <Routes>
        <Route exact path={router.login} element={<LoginUtils/>}/>
        <Route exact path={router.signUp} element={<SignupUtils/>}/>
        <Route exact path={router.reset} element={<ForgetPasswordUtils/>}/>
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
        <Route exact path={router.zone+'/:id'} element={<QRCodeUtils/>}/>
        <Route path="*" element={<MissingRoute/>} />
    </Routes>
  );
}

export default App;