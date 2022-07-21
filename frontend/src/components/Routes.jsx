import React from 'react'
import { Switch,Route,Redirect } from 'react-router-dom'

import Signup from '../pages/signup/Signup'
import Login from '../pages/login/Login'
import Home from './Home/Home'
import PostsPage from './Posts/PostsPage'
import AuthApi from '../pages/AuthApi'

const Routes = ()=> {
    const Auth=React.useContext(AuthApi)
  return (
    <Switch>
        <ProtectedLogin path='/' exact component={Home} />
        <ProtectedLogin path='/signup' component={Signup} />
        <ProtectedLogin path='/login' component={Login} auth={Auth.auth} />
        <ProtectedRoute path='/posts' component={PostsPage} />
    </Switch>
  )
}

const ProtectedLogin = ({auth, Component, ...rest}) => {
    console.log(auth)
    return(
        <Route 
        {...rest}
        render={() => !auth ? (
            <Component/>
        ) :(
            <Redirect to="/posts" />
        ) }
        />
    )
}

const ProtectedRoute = ({auth, Component, ...rest}) => {
    console.log(auth)
    return(
        <Route 
        {...rest}
        render = {() => auth? (
            
                <Component />
            
        ) :
            (
                <Redirect to="/login" />
            )
            }
        />
    )
}
export default Routes