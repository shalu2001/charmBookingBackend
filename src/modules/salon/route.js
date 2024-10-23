import { getAllSalons } from "./service.js";
import express from "express";


const salonsRouter = express.Router();

salonsRouter.get("/salons",getAllSalons);

export default salonsRouter;