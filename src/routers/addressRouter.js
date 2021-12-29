import express from 'express'
// import { requireSignin, userMiddleware } from '../common-middleware/index'
import { addAddress, getAddress } from '../controllers/addressController.js'
const router = express.Router();


router.post('/create', addAddress);
router.post('/getaddress', getAddress);
export default router;