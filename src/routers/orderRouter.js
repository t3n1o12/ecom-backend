// import express from "express";
// import expressAsyncHandler from "express-async-handler";
// // import Order from "../models/orderModel";

// const orderRouter = express.Router();

// orderRouter.post(
//   "/",
//   expressAsyncHandler(async (req, res) => {
//     if (req.body.orderItems.length === 0) {
//       req.status(400).send({ mesage: "Cart is empty" });
//     } else {
//       const order = new Order({
//         orderItems: req.body.orderItems,
//         shippingAddress: req.body.shippingAddress,
//         paymentMethod: req.body.paymentMethod,
//         itemsPrice: req.body.itemsPrice,
//         shippingPrice: req.body.shippingPrice,
//         taxPrice: req.body.taxPrice,
//         totalPrice: req.body.totalPrice,
//         user: req.user._id,
//       });
//       const createdOreder = await order.save();
//       res.status(201).send({mesage:'New order Created', order:createdOrder});
//     }
//   })
// );
