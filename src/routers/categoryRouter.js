import { addCategory, getCategory } from "../controllers/categoryController"
import express from 'express';

const router = express.Router();

router.route("/").post(addCategory)
router.route("/get").get(getCategory)

export default router;