import React from 'react'
import { Routes, Route, Navigate  } from 'react-router-dom'
import './App.css'
import {router} from './Routes/routhPaths';
import {Layout} from "./components/SidebarHeaderWrapper";
import LoginUtils from './Screens/Auth/Login/login.utils';
import MainUtils from './Screens/Main/Main.utils';
import SignupUtils from './Screens/Auth/SignUp/signUp.utils';
import VerifyUtils from './Screens/Auth/Verify/verify.utils';

const App = () => {
  // const PrivateRoute = ({ children}) => {
  //   const isAdmin = JSON.parse(sessionStorage.getItem('userLogged'));
  //   if(isAdmin !== null){
  //     if (isAdmin.user_type === 'admin' ) {
  //       return children
  //     } 
  //   }
      
  //   return <Navigate to={router.admin} />
  // }
  function MissingRoute() {
    return <Navigate to={{pathname: router.main}} />
  }

  return (
    <Routes>
        <Route exact path={router.login} element={<LoginUtils/>}/>
        <Route exact path={router.signUp} element={<SignupUtils/>}/>
        <Route exact path={router.verify+'/:token'} element={<VerifyUtils/>}/>
        <Route exact path={router.main} element={<MainUtils/>}/>
        {/* <Route path="*" element={<MissingRoute/>} /> */}
    </Routes>
  );
}

export default App;