import React from 'react';
import '../styles/Home.css'
import Header from '../components/Header';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
function Home() {
    return (
        <div className='home'>
        <Header />
        <div className='home_body'>
          <CreatePost />
          <Post
            message="hello world 😊 "
            timestamp="11/03/2022"
            username="Amine Asfar"
          />
        
        </div>
              
            </div>
        
    )
}

export default Home