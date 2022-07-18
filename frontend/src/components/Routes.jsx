import React from 'react'
import { Switch,Route,Redirect } from 'react-router-dom'

import Signup from '../pages/signup/Signup'
import Login from '../pages/login/Login'
import Home from '../pages/Home'
import AuthApi from '../pages/AuthApi'

const Routes = ()=> {
    const Auth=React.useContext(AuthApi)
  return (
    <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signup' component={Signup} />
        <ProtectedLogin path='/login' component={Login} auth={Auth.auth} />
    </Switch>
  )
}
const ProtectedLogin = ({auth, component: Component, ...rest}) => {
    return(
        <Route 
        {...rest}
        render = {() => !auth? (
            <>
                <Component />
            </>
        ) :
            (
                <Redirect to="/" />
            )
            }
        />
    )
}
export default Routes