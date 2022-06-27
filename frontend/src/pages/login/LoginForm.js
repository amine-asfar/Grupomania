import React from 'react'
import '../../styles/LoginForm.css'
function LoginForm() {
  return (
    <div className='login_form'>
        <h2>Login</h2>
        <form>
            <label>
                Email 
                <input type="text" name="Email" />
            </label>
            <label>
                Password 
                <input type="text" name="Password" />
            </label>
            <div className='bottom_flex'>
                <input type="submit" value="Create" className='bottom_create'></input>
            </div>
        </form>
    </div>
  )
}

export default LoginForm