const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define route for the main page
// app.get('/', (req, res) => {
//  res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Define route for fetching IP details by providing any IP address
app.get('/ip/:ip?', async (req, res) => {
  const clientIp = req.params.ip || getClientIp(req); // Get the client's IP address

  if (!req.params.ip) {
    return res.send('Please provide an IP address. Example: /ip/8.8.8.8');
  }

  try {
    const ipDetailsResponse = await axios.get(`https://ipinfo.io/${clientIp}`);
    const ipDetails = removeReadmeProperty(ipDetailsResponse.data);
    res.json(ipDetails);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch IP details' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Helper function to get client's IP address
function getClientIp(req) {
  // Check for proxy headers or use req.connection.remoteAddress directly
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}

// Helper function to remove "readme" property from ipinfo.io response
function removeReadmeProperty(ipDetails) {
  if (ipDetails && ipDetails.readme) {
    delete ipDetails.readme;
  }
  return ipDetails;
}
