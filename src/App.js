import React from 'react'
import { Routes, Route, Navigate  } from 'react-router-dom'
import './App.css'
import {router} from './Routes/routhPaths';
import LoginView from "./Screens/Login/login.view";
import SignUpView from './Screens/SignUp/signUp.view';
import {Layout} from "./Components/SidebarHeaderWrapper";
import MainView from "./Screens/Main/main.view";

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
    return < Navigate to={{pathname: router.main}} />
  }

  return (
    <Routes>
        <Route exact path={router.login} element={<LoginView/>}/>
        <Route exact path={router.signUp} element={<SignUpView/>}/>
        <Route exact path={router.main} element={<MainView/>}/>
        <Route path="*" element={<MissingRoute/>} />
    </Routes>
  );
}

export default App;