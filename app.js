// const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/charmBooking");

import express from 'express';
import { MongoClient } from 'mongodb';
import salonsRouter from './src/modules/salon/route.js';
const app = express();
const port = 3000;

// Replace with your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017';
const dbName = 'charmBooking';

// Connect to MongoDB
MongoClient.connect(mongoURI)
  .then(client => {
    console.log('Connected to MongoDB');
    const db = client.db(dbName);

    // Middleware to attach the database connection to the request object
    app.use((req, res, next) => {
        req.db = db;
        next();
      });

    // Use the salons router
    app.use('/api', salonsRouter);

    // Start the server
    app.listen(port, () => {
      console.log(`server running on http://localhost:${port}`);
    });
  })
  .catch(err => console.error(err));