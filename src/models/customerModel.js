import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    accepts_marketing: { type: Boolean, default: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    verified_email: { type: Boolean, default: true },
    addresses: [
      {
        addresses1: { type: String, required: true },
        city: { type: String, required: true },
        province: { type: String, required: true },
        zip: { type: Number, required: true },
        country_name: { type: String, required: true },
      },
    ],
  },

  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
