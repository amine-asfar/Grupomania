import React from 'react';

import {Routes, Route}from 'react-router-dom'
import './styles/App.css'
// import Cookies from 'cookies-js';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Home from './pages/Home';
// import AuthApi from './pages/AuthApi';
// import { useNavigate } from 'react-router-dom'
function App() {
  const [auth, setAuth] = React.useState(false);
  //const navigate=useNavigate()
  // const [setAuth]=React.useState(false);
  //  const Auth=React.useContext(AuthApi)
  //  // gestion des cookies
  // const readCookie = () => {
  //   const user = Cookies.get("user");
  //   if(user) {
  //     setAuth(true);
  //   }
  // }
  //  const ProtectedLogin=({auth,element:Element,...rest})=>{
  //   return(
  //     <Route 
  //       {...rest}
  //       render = {() => !auth? (
  //           <>
  //               <Element/>
  //           </>
  //       ) :
  //           (
  //               navigate("/")
  //           )
  //           }
  //       />
  //   );
  // }

  return (
    <div className='app'>
    
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>}  />
      </Routes>
    
    </div>
  );
}

export default App;
