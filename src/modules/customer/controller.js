import express from "express";
import Customer from "./customer.js";
import registerCustomer from "./service.js";
import loginCustomer from "./service.js";

const  registerCustomerController = async (req, res) => {
    try{
        const { firstName, lastName, dateofBirth, userName, email, password } = req.body;
        // Check if the required fields are provided
        if (!firstName || !lastName || !dateofBirth || !userName || !email || !password) {
            return res.status(400).json({ error: { message: "All fields are required" } });
        }
        // Check if the user already exists
        const existingUser = await Customer
            .findOne({ $or: [{ userName }, { email }] })
            .exec();
        if (existingUser) {
            return res.status(409).json({ error: { message: "User already exists" } });
        }
        const newCustomer = await registerCustomer(req.body);
        res.status(201).json({ customer: newCustomer, message: 'Customer registered successfully' });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: { message: "Internal server error" } });
    }
};

const loginCustomerController = async (req, res) => {
    try {
        const { email,userName, password } = req.body;
        console.log(email
            ,userName
            ,password);
        if ((!email && !userName) || !password) {
            return res.status(400).json({ error: { message: "All fields are required" } });
        }
        const customer = await loginCustomer(email,userName, password);
        if (!customer) {
            return res.status(401).json({ error: { message: "Invalid credentials" } });
        }

        res.status(200).json({ customer, message: 'Customer logged in successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: { message: "Internal server error" } });
    }
};

export default {registerCustomerController, loginCustomerController};