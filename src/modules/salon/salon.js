import mongoose from 'mongoose';

// Define Salon Schema
const salonSchema = new mongoose.Schema({
  salonName: {
    type: String,
    required: true,
    trim: true,
  },
  ownerName: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  contactInfo: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  services: [
    {
      serviceName: { type: String, required: true },
      price: { type: Number, required: true },
      durationMinutes: { type: Number, required: true },
    },
  ],
  workingHours: {
    monday: { type: String, required: true },
    tuesday: { type: String, required: true },
    wednesday: { type: String, required: true },
    thursday: { type: String, required: true },
    friday: { type: String, required: true },
    saturday: { type: String, required: true },
    sunday: { type: String, required: true },
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      customerName: { type: String, required: true },
      rating: { type: Number, required: true },
      reviewText: { type: String, required: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const salon = new mongoose.model("salon", salonSchema);
export default salon;
