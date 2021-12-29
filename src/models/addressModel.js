import mongoose from "mongoose"
import Customer from './customerModel';

// C
const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 50,
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true,
  },
  pinCode: {
    type: String,
    required: true,
    trim: true,
  },
  locality: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 100,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 100,
  },
  districtTown: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    required: true,
  },
  landmark: {
    type: String,
    min: 10,
    max: 100,
  },
  alternatePhone: {
    type: String,
  },
  addressType: {
    type: String,
    required: true,
    enum: ["home", "work"],
    required: true,
  },
});

// B
const userAddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    address: [addressSchema],
  },
  { timestamps: true }
);

mongoose.model("Address", addressSchema);
const CustomerAddress = mongoose.model("CustomerAddress", userAddressSchema);

export default CustomerAddress;