

import React from 'react';
import logo from '../../assets/icon-left-font-monochrome-white.png'
import {Link} from 'react-router-dom';
import '../../styles/Home.css'
import SignupIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Logout';


const Home = () => {

    

    return (
            <div>

              <div className='header'>
                <div className='header__left'>
                  <img src={logo} alt='logo-Groupomania' className='gm-logo' />
                </div>
              </div>
              <div className='home_body'>
                <h1>Bienvenue sur le réseau social de Groupomania !</h1>
                <div className='home_button'>
                  <Link to="/signup"><button><SignupIcon/> S'inscrire</button></Link>
                  <Link to="/login"><button><LoginIcon /> Se connecter</button></Link>
                </div>
              </div>
            </div>
        
    );
}

export default Home;