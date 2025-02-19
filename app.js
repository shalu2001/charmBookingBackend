import express from 'express';
import cors from 'cors'; 
import mongoose from 'mongoose';
import salonsRouter from './src/modules/salon/route.js';
import customerRouter from './src/modules/customer/route.js';
const app = express();
const port = 3000;

app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Replace with your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/charmBooking';

// Connect to MongoDB
mongoose.connect(mongoURI,{
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('Connected to MongoDB');

    // Use the salons router
    app.use('/api', salonsRouter);
    app.use("/api",customerRouter)

    // Start the server
    app.listen(port, () => {
      console.log(`server running on http://localhost:${port}`);
    });
  })
  .catch(err => console.error(err));