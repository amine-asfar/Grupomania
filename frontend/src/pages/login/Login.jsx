import React from 'react'
import '../../styles/Login.css'
import HeaderLogin from './HeaderLogin'
import {LoginForm} from './LoginForm'
function Login() {
  return (
    <div >
      <HeaderLogin/>
      <div className='login_body'>
        {<LoginForm/>}
      </div>
    </div>
  )
}

export default Login