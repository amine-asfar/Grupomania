const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('./utils/jwt.utils')

//Imports Routes
const users = require('./routes/userRoute');
const posts = require('./routes/postRoute')

const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', users);
app.use('/api/', posts)

// Exporting module
module.exports = app;