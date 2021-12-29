import express from 'express';
import { validateSignupRequest, isRequestValidated, validateSigninRequest } from '../validators/userValidate';
import { signup, signin ,signOut} from "../controllers/userController"
const router = express.Router();


router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/signin', validateSigninRequest, isRequestValidated, signin);
router.post('/signout',signOut)

// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });

export default router