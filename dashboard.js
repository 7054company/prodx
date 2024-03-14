const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const fs = require('fs');
const path = require('path');

const secretKey = '12345'; // Replace with your secure secret key

// Middleware to authenticate requests
router.use((req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token verification failed' });
            }
            req.user = decoded;
            next();
        });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// Dashboard endpoint
router.get('/u', (req, res) => {
    const { userId } = req.user;

    // Read user information from a database or file (data.txt in this case)
    const filePath = path.join(__dirname, 'data.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        // Find the user based on userId
        const lines = data.split('\n');
        for (const line of lines) {
            const [id, username, pass, fname, lname, email, ip] = line.split(' ');
            if (id === userId) {
                // Return user details including IP address
                const userDetails = {
                    uid: id,
                    username: username,
                    name: `${fname} ${lname}`, // Combine fname and lname
                    email: email,
                    ip: ip, // Add IP address to the response
                };
                return res.json(userDetails);
            }
        }

        // If user not found
        res.status(404).json({ message: 'User not found' });
    });
});

module.exports = router;
