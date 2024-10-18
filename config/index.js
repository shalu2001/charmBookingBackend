const express = require('express');
const { MongoClient } = require('mongodb');
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

    // Example route
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch(err => console.error(err));