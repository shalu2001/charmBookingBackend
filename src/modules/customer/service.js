import Customer from './customer.js';
import bcrypt from "bcrypt";

export const registerCustomer = async (customerData) => {
    try {
        const { firstName, lastName, dateofBirth, userName, email, password } = customerData;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const customer = new Customer({
            firstName,
            lastName,
            dateofBirth,
            userName,
            email,
            password: hashedPassword,  
        });
        await customer.save();
        return customer;
    } catch (err) {
        throw new Error(err.message);
    }
}

export const loginCustomer = async (email, password) => {
    try {
        // Find the customer by email or username
        const customer = await Customer.findOne({email}).exec();
        if (!customer) {
            return null;
        }
        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return null;
        }
        return customer;
    }
    catch (err) {
        throw new Error(err.message);
    }
}

