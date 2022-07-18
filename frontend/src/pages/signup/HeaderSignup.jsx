import React from 'react'
import '../../styles/Header.css'
import logo from '../../assets/icon-left-font-monochrome-white.png'
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';


function HeaderSignup() {
    return (
        <div className='header'>
            <div className='header__left'>
                <img src={logo} alt='logo-Groupomania' className='gm-logo' />
            </div>
            <div className='header__right'>
                <Link to='/login'>
                    <LogoutIcon />
                    <span>Login </span>
                </Link>


            </div>
        </div>
    )
}

export default HeaderSignup