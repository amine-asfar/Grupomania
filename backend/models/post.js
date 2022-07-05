const mongoose = require('mongoose');

const postShema = mongoose.Schema({
    userId: { type: String, required: true }, 
    message: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number },
    usersLiked: { type: Array, required: true },
    

})

module.exports = mongoose.model('post', postShema);