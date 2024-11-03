import mongoose from "mongoose";

// Define User Schema
const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  dateofBirth: {
    type: Date,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    default: "customer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Customer = new mongoose.model("Customer", customerSchema);
export default Customer;































































































