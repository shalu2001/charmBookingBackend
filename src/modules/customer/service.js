import Customer from './customer.js';
import bcrypt from "bcrypt";

const registerCustomer = async (customerData) => {
    try {
        const { firstName, lastName, dateofBirth, userName, email, password } = customerData;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
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

export default registerCustomer;
