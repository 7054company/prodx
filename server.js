const express = require('express');
const apiRouter = require('./api');
const axios = require('axios');
const path = require('path');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const secretKey = '12345'; // Replace with a strong secret key

let loggedInUser = null;

app.use(express.json()); // Parse JSON requests

// Function to generate a JWT token
const generateToken = (user) => {
    return jwt.sign(user, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
};

app.use('/api', apiRouter);

app.use(express.static('views'));

app.post('/api/auth', (req, res) => {
    const { username, password } = req.body;

    // Read user data from the file (data.txt)
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }

        // Split the file content into lines
        const lines = data.split('\n');

        // Check if there's a matching user
        const foundUser = lines.find(line => {
            const [id, storedUsername, storedPassword, firstName, lastName] = line.split(' ');
            return username === storedUsername && password === storedPassword;
        });

        if (foundUser) {
            const [, , , firstName, lastName] = foundUser.split(' ');
            loggedInUser = { username, firstName, lastName };

            // Generate a token for the logged-in user
            const token = generateToken(loggedInUser);

            res.json({ success: true, message: `Welcome, ${firstName} ${lastName}!`, token });
        } else {
            res.json({ success: false, message: 'Invalid username or password' });
        }
    });
});

app.get('/api/user/token', verifyToken, (req, res) => {
    res.json({ success: true, user: loggedInUser });
});

// Middleware to verify the token
function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ success: false, message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Failed to authenticate token' });
        }

        req.decoded = decoded;
        next();
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
