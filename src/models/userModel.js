/** @format */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 1,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 1,
      max: 20,
    },
    userAva: {
      type: String,
    },
    birth: {
      type: String,
    },
    sex: {
      type: String,
    },
    role: {
      type: String,
    },
    status: {
      type: String,
    },
    department: {
      type: String,
    },
    phone: {
      type: String,
    },
    website: {
      type: String,
    },
    addressline1: {
      type: String,
    },
    addressline2: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    language: {
      type: String,
    },
    postcode: {
      type: String,
    },
    twiter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    zalo: {
      type: String,
    },
  },
  {timestamps: true}
);
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.password_hash);
  },
};
const User = mongoose.model('User', userSchema);
export default User;
