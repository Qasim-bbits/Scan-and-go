import React from 'react'
import { Routes, Route, Navigate  } from 'react-router-dom'
import './App.css'
import MenuBar from './layout/MenuBar'
import Dashboard from './pages/Admin/Dashboard/Dashboard'
import Products from './pages/Admin/Products/Products'
import router from './routePaths/routePaths'

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
    return < Navigate to={{pathname: router.dashboard}} />
  }

  return (
    <Routes>
      <Route path="/" element={<MenuBar />} >
        <Route exact path={router.dashboard} element={<Dashboard/>}/>
        <Route exact path={router.products} element={<Products/>}/>
      </Route>
      <Route path="*" element={<MissingRoute/>} />
    </Routes>
  );
}

export default App;