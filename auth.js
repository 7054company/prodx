const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Define a route for login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Read user data from the data.txt file
    const filePath = path.join(__dirname, 'data.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        // Check if the user credentials are valid
        const lines = data.split('\n');
        for (const line of lines) {
            const [id, name, pass] = line.split(' ');
            if (name === username && pass === password) {
                return res.json({ message: 'Login successful', userId: id });
            }
        }

        // If no matching user found
        res.status(401).json({ message: 'Invalid credentials' });
    });
});

module.exports = router;
