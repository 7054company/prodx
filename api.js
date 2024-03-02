const express = require('express');
const router = express.Router();

router.get('/message', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

// Handle /api/any/:ipAddress
router.get('/any/:ipAddress', (req, res) => {
    const ipAddress = req.params.ipAddress;
    res.json({ ipAddress });
});

// Handle /api
router.get('/', (req, res) => {
    res.json({ message: 'This is the /api endpoint.' });
});

module.exports = router;
