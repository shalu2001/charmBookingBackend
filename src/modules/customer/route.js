import registerCustomerController from "./controller.js";
import express from "express";

const customerRouter = express.Router();

customerRouter.post("/signup", registerCustomerController);

export default customerRouter;