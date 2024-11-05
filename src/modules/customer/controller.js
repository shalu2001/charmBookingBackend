import express from "express";
import Customer from "./customer.js";
import registerCustomer from "./service.js";

const  registerCustomerController = async (req, res) => {
    try{
        const { firstName, lastName, dateofBirth, userName, email, password } = req.body;
        // Check if the required fields are provided
        if (!firstName || !lastName || !dateofBirth || !userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Check if the user already exists
        const existingUser = await Customer
            .findOne({ $or: [{ userName }, { email }] })
            .exec();
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newCustomer = await registerCustomer(req.body);
        res.status(201).json({ customer: newCustomer, message: 'Customer registered successfully' });
    }
    catch(err){
        res.status(500).send({ message: err.message });
    }
};

export default registerCustomerController;