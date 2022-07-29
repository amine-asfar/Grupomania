
import '../../styles/LoginForm.css'
import { useState } from "react";
import { useAuth } from "../Auth";
import { useNavigate,useLocation } from "react-router-dom";


export const LoginForm=()=>{
    const [user,setUser]=useState({
        email:'',
        password:''
    })
    const auth=useAuth()
    const navigator=useNavigate();
    const location=useLocation();

    const redirectPath=location.state?.path || '/posts'

    const handleChange=({currentTarget:input})=>{
        setUser({...user,[input.name]:input.value});
    }

    const handleLogin=async(e)=>{
        e.preventDefault();
        
        await fetch("http://localhost:3000/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user),
        })
        
        .then(res => res.json())
        .then(
            (result) => {
                // localStorage.setItem('userConnect', JSON.stringify(result));
                // let storage = JSON.parse(localStorage.getItem('userConnect'));
                if (result.token === undefined) {
                    alert("Utilisateur non identifié. Tentez de vous connecter à nouveau !")
                } else {
                    console.log(user)
                    auth.login({...user, token: result.token,userName:result.userName,userId:result.userId})
                    // auth.login(user)
                    navigator(redirectPath,{replace:true})
                    
                    alert("La communauté de Groupomania est contente de vous revoir !")
                }
    })
}
    return(
        <div className="login_form">
            <h2>Login</h2>
            <form>
                <label>
                    Email
                    <input type='email' name='email' onChange={handleChange} value={user.email} required  />
                </label>
                <label>
                    Password
                    <input type='password' name='password' onChange={handleChange} value={user.password} required />
                </label>

                <div className='bottom_flex'>
                    <button type="submit" className='bottom_create' onClick={handleLogin}>Login</button>
                </div>

            </form>
            
            
        </div>
    )
}

