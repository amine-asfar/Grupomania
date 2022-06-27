import React from 'react';
import './styles/App.css'
import Header from './components/Header'

import CreatePost from './components/CreatePost';
import Post from './components/Post';

function App() {
  return (
    <div className='app'>
      <Header />
      <div className='app_body'>
        <CreatePost />
        <Post
          message="hello world 😊 "
          timestamp="11/03/2022"
          username="Amine Asfar"
        />
      
      </div>
    </div>
  );
}

export default App;
