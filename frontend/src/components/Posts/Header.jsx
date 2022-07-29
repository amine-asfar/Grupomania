import React from 'react'
import '../../styles/Header.css'
import logo from '../../assets/icon-left-font-monochrome-white.png'
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../../pages/Auth'
function Header() {
    // const Auth = React.useContext(AuthApi);
    // const handleLogout=()=>{
    //     //localStorage.removeItem("token");
    //     //Auth.setAuth(false)
    // }
    const auth=useAuth()
    const navigator=useNavigate()
    const handleLogout=()=>{
        auth.logout()
        navigator('/')
    }
    return (
        <div className='header'>
            <div className='header__left'>
                <img src={logo} alt='logo-Groupomania' className='gm-logo' />
            </div>
            <div className='header__right'>
                <button onClick={handleLogout}>
                    <LogoutIcon />
                    <span>Logout </span>
                </button>


            </div>
        </div>
    )
}

export default Header