

import React, {useState, useCallback, useContext, useMemo, createContext} from 'react';
import AuthApi from '../AuthApi';
import Cookies from 'cookies-js';

import '../../styles/LoginForm.css'
import { Redirect } from 'react-router-dom';

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
                    console.log("test false")
                    console.log(Auth)
                    alert("Utilisateur non identifié. Tentez de vous connecter à nouveau !")
                } else {
                    console.log("test true")
                    console.log(Auth)
                    Auth.setAuth(true)
                    Cookies.set("user", "loginTrue")
                    Redirect()
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