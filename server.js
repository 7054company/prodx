const express = require('express');
const apiRouter = require('./api');
const authRouter = require('./auth');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'views')));
app.use('/auth', authRouter);
app.use('/api', apiRouter);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


