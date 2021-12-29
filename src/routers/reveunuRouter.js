import express from "express";
import { getReveunuByDay, getReveunuByMonth, getReveunuByWeek } from "../controllers/reveunuController";


const router = express.Router();

// create order
router.route("/day").post(getReveunuByDay);
router.route("/week").post(getReveunuByWeek);
router.route("/month").post(getReveunuByMonth);

export default router;