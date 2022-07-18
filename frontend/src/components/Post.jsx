import React from 'react'
import '../styles/post.css'

function Post({ username, timestamp, message }) {
    return (
        <div className='post'>
            <div className='post__top'>
                <h3>{username}</h3>
                <p>{timestamp}</p>
            </div>
            <div className='post__bottom'>
                {message}
                <img src='https://d1fmx1rbmqrxrr.cloudfront.net/cnet/optim/i/edit/2020/05/applis-retouche-android-ios-big__w1200.jpg' alt='test'></img>
            </div>
            <div className='post__option'>
                <p>Like</p>
            </div>

        </div>
    )
}

export default Post