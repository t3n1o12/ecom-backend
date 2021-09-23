import express from "express";
import {getCustomerById,
    getCustomer,
    createCustomer,
    DeleteCustomer,
    UpdateCustomer,
    SearchCustomer,
} from "../controllers/customerController";
// import { protect } from "../middleware/authMidleware";

const router = express.Router();
///get all Customer
router.route("/").get(getCustomer);


router
    .route("/:id")
    //get customer bi ID
    .get(getCustomerById)
    //delete customer bi ID
    .delete(DeleteCustomer)
    //update customer bi ID
    .put(UpdateCustomer);
// create customer
router.route("/create").post(createCustomer);
router.route("/search").post(SearchCustomer);
export default router;
