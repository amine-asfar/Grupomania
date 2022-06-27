import React from 'react'
import '../../styles/SignupForm.css'
function SignupForm() {
  return (
    <div className='signup_form'>
        <h2>New account</h2>
        <form>
            <div className='first_last_name'>
                <label>
                First Name 
                <input type="text" name="First Name" />
                </label>
                <label>
                Last Name 
                <input type="text" name="Last Name" />
                </label>

            </div>
            <label>
                User Name 
                <input type="text" name="User Name" />
            </label>
            <label>
                Email 
                <input type="text" name="Email" />
            </label>
            <label>
                Password 
                <input type="text" name="Password" />
            </label>
            <label>
                Confirm password 
                <input type="text" name="Confirm password" />
            </label>
            <div className='bottom_flex'>
            <input type="submit" value="Create" className='bottom_create'></input>
            </div>
        </form>
    </div>
  )
}

export default SignupForm