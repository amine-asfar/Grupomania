import React from 'react'
import '../../styles/Header.css'
import logo from '../../assets/icon-left-font-monochrome-white.png'
import LogoutIcon from '@mui/icons-material/Logout';
function HeaderLogin() {
    return (
        <div className='header'>
            <div className='header__left'>
                <img src={logo} alt='logo-Groupomania' className='gm-logo' />
            </div>
            <div className='header__right'>
                <a href='#'>
                    <LogoutIcon />
                    <span>signup</span>
                </a>


            </div>
        </div>
    )
}

export default HeaderLogin