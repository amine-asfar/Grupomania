import React from "react";

import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "./pages/login/Login";
import PostsPage from "./components/Posts/PostsPage";
import Home from "./components/Home/Home";
import Signup from "./pages/signup/Signup";


import "./styles/App.css";

import "bootstrap/dist/css/bootstrap.css";

//GLOBAL STATE MANAGMENT

import { UserAuthState } from "./ContextAPI/isAuth";


function App() {

  return (
    <div className="app">
      <UserAuthState>
        
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/posts" element={<PostsPage />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </BrowserRouter>
      
      </UserAuthState>
    </div>
  );
}

export default App;
