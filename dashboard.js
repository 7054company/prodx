const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
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
       // You can fetch user information from a database based on userId
       // For this example, we'll return a basic user object
       const user = {
           uid: userId,
           name: 'John Doe',
       };
       res.json(user);
   });

   module.exports = router;
   
