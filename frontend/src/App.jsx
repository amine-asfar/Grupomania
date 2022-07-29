import React from 'react';

import { Route,Routes,BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './pages/Auth';
import Login from './pages/login/Login'
import PostsPage from './components/Posts/PostsPage'
import Home from './components/Home/Home'
import Signup from './pages/signup/Signup'
import { RequireAuth } from './pages/RequireAuth';
import Cookies from 'cookies-js';
import './styles/App.css'


function App() {
 // const [auth, setAuth] = React.useState(false);

  // const readCookie = () => {
  //   const user = Cookies.get("user");
  //   if(user) {
  //     setAuth(true);
  //   }
  // }
  // React.useEffect(() => {
  //   readCookie();
  // }, [])
  
  return (
    <div className='app'>
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/posts' element={<RequireAuth><PostsPage/></RequireAuth>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
    </div>
  );
}

export default App;
