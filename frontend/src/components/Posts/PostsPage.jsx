import React from 'react';
import '../../styles/PostsPage.css'
import Header from '../Posts/Header';
import CreatePost from '../Posts/CreatePost';
import Post from '../Posts/Post';
function PostsPage() {
    return (
        <div>
        <Header />
        <div className='postpage_body'>
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

export default PostsPage