import React from 'react'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import '../../styles/SignupForm.css'
function SignupForm() {
    const[data,setData]=useState({
        firstName:"",
        lastName:"",
        userName:"",
        email:"",
        password:""
    });
    
    const navigate=useNavigate()

    const handleChange=({currentTarget:input})=>{
        setData({...data,[input.name]:input.value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        await fetch("http://localhost:3000/api/auth/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data),
        })
        .catch (error=>{
            window.alert(error);
            return;
        })
        navigate("/login")
        
    }
    
  return (
    <div className='signup_form'>
        <h2>New Account</h2>
        <form onSubmit={handleSubmit}>
            <div className='first_last_name'>
                <label>
                First Name 
                <input type="text" name="firstName" onChange={handleChange} value={data.firstName} required />
                </label>
                <label>
                Last Name 
                <input type="text" name="lastName" onChange={handleChange} value={data.lastName} required />
                </label>

            </div>
            <label>
                User Name 
                <input type="text" name="userName" onChange={handleChange} value={data.userName} required />
            </label>
            <label>
                Email 
                <input type="email" name="email" onChange={handleChange} value={data.email} required />
            </label>
            <label>
                Password 
                <input type="password" name="password" onChange={handleChange} value={data.password} required/>
            </label>
            <div className='bottom_flex'>
            <button type="submit" className='bottom_create'>Create</button>
            </div>
        </form>
    </div>
  )
}

export default SignupForm