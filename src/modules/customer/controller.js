import Customer from "./customer.js";
import {registerCustomer} from "./service.js";
import {loginCustomer} from "./service.js";
import jwt from 'jsonwebtoken';

export const  registerCustomerController = async (req, res) => {
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

export const loginCustomerController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: { message: "All fields are required" } });
        }
        const customer = await loginCustomer(email, password);
        if (!customer) {
            return res.status(401).json({ error: { message: "Invalid credentials" } });
        }

        //Generaate token
        const token = jwt.sign({
            id: customer._id,
            email: customer.email,
            role: customer.role
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.status(200).json({ customer,token, message: 'Customer logged in successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: { message: "Internal server error" } });
    }
};

