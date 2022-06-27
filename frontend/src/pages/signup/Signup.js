import React from 'react'
import '../../styles/signup.css'
import HeaderSignup from './HeaderSignup'
import SignupForm from './SignupForm'
function Signup() {
  return (
    <div className='signup'>
    <HeaderSignup/>
    <div className='signup_body'>
    <SignupForm/>
    </div>
    </div>
  )
}

export default Signup