const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to serve custom 404 page
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Endpoint to fetch IP details
app.get('/ip/:ipAddress', async (req, res) => {
  const ipAddress = req.params.ipAddress;

  try {
    const ipDetails = await axios.get(`https://ipinfo.io/${ipAddress}`);
    res.json(ipDetails.data);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch IP details' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
 
