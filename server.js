const express = require('express');
const apiRouter = require('./api');
const authRouter = require('./auth');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., login.html) from the 'views' directory
app.use(express.static(path.join(__dirname, 'views')));

// Use the apiRouter for '/api' endpoints
app.use('/api', apiRouter);

// Use the authRouter for '/auth' endpoints
app.use('/auth', authRouter);

// Define a route for the root ('/') endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
