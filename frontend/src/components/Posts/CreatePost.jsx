import React, { useState } from 'react'
import '../../styles/CreatePost.css'
function CreatePost() {
    let storage = JSON.parse(localStorage.getItem('user'));
    let token=storage.token;
    console.log(token)
    const[post,setPost]=useState({
        userId:storage.userId,
        message:"",
        imageUrl:"test.png",
        usersLikes:[1,2,3]
    })

    const handleChange=({currentTarget:input})=>{
        setPost({...post,[input.name]:input.value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        await fetch("http://localhost:3000/api/post/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Authorization': `Bearer ${token}`,
            },
            body:JSON.stringify(post),
        })
        .catch (error=>{
            window.alert(error);
            return;
        })
       
        
    }

  return (
    <div className='createpost'>
    <form onSubmit={handleSubmit}>
        <label >

            <input type='text' name='message' placeholder='whats in your mind' className='createpost__input' onChange={handleChange} value={post.message}/>
            <input type='submit' value='share' />
        </label>
    </form>
    </div>
  )
}

export default CreatePost

