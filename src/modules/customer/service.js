import Customer from './customer.js';

const registerCustomer = async (customerData) => {
    try {
        const customer = new Customer(customerData);
        await customer.save();
        return customer;
    } catch (err) {
        throw new Error(err.message);
    }
}

export default registerCustomer;