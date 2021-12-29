import asyncHandler from "express-async-handler";
import Order from "../models/orderModel"



const createOrder = asyncHandler(async (req, res) => {
  const {
    payablePrice, purchasedQty, shippingAddress, customer,
    items, taxPrice, discounts, paymentMethod, isDelivered, isPaid,totalPrice,totalAmount
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
  req.body.totalPrice = parseInt(items.payablePrice) * parseInt(items.purchasedQty)
 
  req.body.totalAmount= taxPrice *  req.body.totalPrice +  req.body.totalPrice - discounts;
  console.log(taxPrice, totalPrice, discounts)


  if (!shippingAddress || !customer || !taxPrice) {
    res.status(400);
    throw new Error("Please Fill all the fields");

  }
  else {
    const order = new Order(req.body);
    order.save((error, order) => {
      if (error) return res.status(400).json({ error });
      if (order) {
        const { payablePrice, purchasedQty, shippingAddress, customer,
          taxPrice, discounts, paymentMethod } = order
        res.status(201).json({ order });
      }
    });
  }

})

const getOrders = (req, res) => {
  Order.find({ user: req.user._id })
    .select("_id paymentStatus paymentType orderStatus items")
    .populate("items.productId", "_id name productPictures")
    .exec((error, orders) => {
      if (error) return res.status(400).json({ error });
      if (orders) {
        res.status(200).json({ orders });
      }
    });
};

export { createOrder, getOrders }