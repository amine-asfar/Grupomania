// import React from 'react'
// import { useState } from 'react'

// import axios from 'axios'

// //import { useNavigate } from 'react-router-dom'
// import '../../styles/LoginForm.css'


// function LoginForm() {
//     const[data,setData]=useState({
//         email:"",
//         password:""
//     });

//     //const navigate=useNavigate()

//     const handleChange=({currentTarget:input})=>{
//         setData({...data,[input.name]:input.value});
//     }

//     const handleSubmit=async(e)=>{
//         e.preventDefault();
//         try{
//             const url ="http://localhost:3000/api/auth/login";
//             const {data:res}=await axios.post(url,data);
//             localStorage.setItem("token",res.data);
//             window.location="/"
//         }catch(error){
//            console.log(error)
//         }
//         // await fetch("http://localhost:3000/api/auth/login",{
//         //     method:"POST",
//         //     headers:{
//         //         "Content-Type":"application/json"
//         //     },
//         //     body:JSON.stringify(data),
            
//         // })
//         // .catch (error=>{
//         //     window.alert(error);
//         //     return;
//         // })
//         //navigate("/")
        
//     }
//   return (
//     <div className='login_form'>
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Email 
//                 <input type="email" name="email" onChange={handleChange} value={data.email} required/>
//             </label>
//             <label>
//                 Password 
//                 <input type="password" name="password" onChange={handleChange} value={data.password} required/>
//             </label>
//             <div className='bottom_flex'>
//             <button type="submit" className='bottom_create'>Login</button>
//             </div>
//         </form>
//     </div>
//   )
// }

// export default LoginForm

import React, {useState, useCallback, useContext, useMemo, createContext} from 'react';
import AuthApi from '../AuthApi';
//import Cookies from 'js-cookie';

import '../../styles/LoginForm.css'

const FormContext = createContext({})

function FormWithContext ({defaultValue, onSubmit, children}) {

    const [data, setData] = useState(defaultValue)

    const change = useCallback(function (name, value) {
        setData(d => ({...d, [name]: value}))
    }, [])

    const value= useMemo(function () {
        return {...data, change}
    }, [data, change])

    const handleSubmit = useCallback(function (e) {
        e.preventDefault()
        onSubmit(value)
    }, [onSubmit, value])

    return <FormContext.Provider value={value}>
        <form onSubmit={handleSubmit}>
            {children}
        </form>
    </FormContext.Provider>
}

function FormField ({name, type, children}) {
    const data = useContext(FormContext)
    const handleChange = useCallback(function (e) {
        data.change(e.target.name, e.target.value)
    }, [data])

    return (
        <label htmlFor={name}>{children}
            <input type={type} name={name} id={name} className="form-control" value={data[name] || ''} onChange={handleChange}/>
        </label>)
}

function PrimaryButton ({children}) {
    return <div className='bottom_flex'>
               <button type="submit" className='bottom_create'>{children}</button>
            </div>
}

function LoginForm() {
    localStorage.clear();
    const [error, setError] = useState(null);
    const Auth = React.useContext(AuthApi);

    const handleSubmit = useCallback(function (value) {

        fetch("http://localhost:3000/api/auth/login", {
            method: "post",
            headers: { "Content-type" : 'application/json'},
            body: JSON.stringify({
                email: value.email,
                password: value.password
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
                localStorage.setItem('userConnect', JSON.stringify(result));
                let storage = JSON.parse(localStorage.getItem('userConnect'));
                if (storage.token === undefined) {
                    Auth.setAuth(false)
                    alert("Utilisateur non identifié. Tentez de vous connecter à nouveau !")
                } else {
                    Auth.setAuth(true)
                    //Cookies.set("user", "loginTrue")
                    alert("La communauté de Groupomania est contente de vous revoir !")
                }
            },
            (error) => {
                if(error) {
                    setError(error);
                    Auth.setAuth(false)
                }
            }
        )
    }, [Auth])

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else {
        return (
            <React.Fragment>
                <div className="login_form">
                    <h2>Connectez-vous à votre compte</h2>
                    <FormWithContext onSubmit={handleSubmit}>
                        <FormField name="email" type="text">Email</FormField>
                        <FormField name="password" type="password">Mot de passe</FormField>
                        <PrimaryButton>Login</PrimaryButton>
                    </FormWithContext>
                </div>
            </React.Fragment>
        );
    }
}


export default LoginForm