import  registerCustomerController  from './controller.js';
import  loginCustomerController  from './controller.js';
import express from "express";

const customerRouter = express.Router();

customerRouter.post("/signup", registerCustomerController);
customerRouter.post("/login", loginCustomerController);

export default customerRouter;