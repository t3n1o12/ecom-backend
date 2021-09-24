import express from "express";
import { DeleteCustomerAddress } from "../controllers/customerController";
import {
    getCustomerById,
    getCustomer,
    createCustomer,
    DeleteCustomer,
    UpdateCustomer,
    SearchCustomer,
    getCustomerAddress,
    getCustomerAddressByID,
    updateCustomerAddressByID,
    createCustomerAddress,

} from "../controllers/customerController";
// import { protect } from "../middleware/authMidleware";

const router = express.Router();


//CUSTOMER
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


//CUSTOMER ADDRESS
router
    .route("/:id/addresses")
    .get(getCustomerAddress)
    .post(createCustomerAddress)

router
    .route("/:id/addresses/:idAdd")
    .get(getCustomerAddressByID)
    .put(updateCustomerAddressByID)
    .delete(DeleteCustomerAddress)
export default router;
