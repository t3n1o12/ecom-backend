


import express from "express";
import {createOrder} from "../controllers/orderController"


const router = express.Router();


//order
///get all order


// create order
router.route("/create").post(createOrder);


//order ADDRESS

export default router;