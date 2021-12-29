


import express from "express";
import {createOrder, getOrders} from "../controllers/orderController"
// import { getReveunuByDay } from "../controllers/reveunu";


const router = express.Router();

// create order
router.route("/create").post(createOrder);
// router.route("/get").post(getOrders);


//order ADDRESS

export default router;