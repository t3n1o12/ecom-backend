import mongoose from "mongoose";


const shippingAddressSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  }
)
const customerSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  verified_email: { type: Boolean, default: true },
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
})
const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        payablePrice: {
          type: Number,
          required: true,
        },
        purchasedQty: {
          type: Number,
          required: true,
        },
      },
    ],
    orderStatus: [
      {
        type: {
          type: String,
          enum: ["ordered", "packed", "shipped", "delivered"],
          default: "ordered",
        },
        date: {
          type: Date,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
    shippingAddress: [shippingAddressSchema],
    customer: [customerSchema],
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled", "refund"],
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["cod", "card"],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    taxPrice: { type: Number, required: true },
    discounts: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    // user: { type: mongoose.Schema.types.Object, ref: "User", required: true },
    isPaid: { type: Boolean, required: true },
    // paidAt: { type: String, required: true },
    isDelivered: { type: Boolean, required: true },
    // deliveredAt: { type: Date },
  },
  { timestamps: true }
);
orderSchema.set('toJSON', {
  virtuals: true
});
// orderSchema.virtual("totalPrice").get(function () {
//    const price= this.items[0].payablePrice * this.items[0].purchasedQty ;
//   return price;
// });
// orderSchema.virtual("totalAmount").get(function () {
//   return this.taxPrice * this.totalPrice + this.totalPrice - this.discounts;
// });

const Order = mongoose.model("Order", orderSchema);
export default Order;
