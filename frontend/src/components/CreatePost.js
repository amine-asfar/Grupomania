import React, { useState } from 'react'
import '../styles/CreatePost.css'
function CreatePost() {
    const [input, setInput] = useState("");
    const handleSubmit = e => {
        e.preventDefault();
    };
    return (
        <div className='createpost'>
            <form>
                <input value={input} onChange={(e) => setInput(e.target.value)} className='createpost__input' placeholder={`What's on your mind ?`}></input>

                <button onClick={handleSubmit} type='submit'>Hidden submit</button>

            </form>
        </div>
    )
}

export default CreatePost