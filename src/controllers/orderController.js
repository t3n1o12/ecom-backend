import asyncHandler from "express-async-handler";
import Order from "../models/orderModel"



const createOrder = asyncHandler(async (req, res) => {
  const {
    payablePrice, purchasedQty, shippingAddress, customer, totalAmount,
    taxPrice, discounts, totalPrice, paymentMethod
  } = req.body
  req.body.orderStatus = [
    {
      type: "ordered",
      date: new Date(),
      isCompleted: true,
    },
    {
      type: "packed",
      isCompleted: false,
    },
    {
      type: "shipped",
      isCompleted: false,
    },
    {
      type: "delivered",
      isCompleted: false,
    },
  ];

  if ( !shippingAddress || !customer || !totalAmount
    || !totalPrice || !taxPrice ) {
    res.status(400);
    throw new Error("Please Fill all the fields");

  }
  else {
    const order = new Order(req.body);
    order.save((error, order) => {
      if (error) return res.status(400).json({ error });
      if (order) {
        res.status(201).json({ order });
      }
    });
  }

})

export {createOrder}