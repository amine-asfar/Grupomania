import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './components/Routes';
import AuthApi from './pages/AuthApi';
import Cookies from 'cookies-js';
import './styles/App.css'


function App() {
  const [auth, setAuth] = React.useState(false);

  const readCookie = () => {
    const user = Cookies.get("user");
    if(user) {
      setAuth(true);
    }
  }
  React.useEffect(() => {
    readCookie();
  }, [])
  
  return (
    <div className='app'>
    <AuthApi.Provider value={{auth, setAuth}}>
      <Router>
        <Routes/>
      </Router>
    </AuthApi.Provider>
    </div>
  );
}

export default App;
