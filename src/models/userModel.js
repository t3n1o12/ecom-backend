import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    userAva: {
        type: String
    },
    birth: {
        type: String
    },
    sex: {
        type: String
    },
    role: {
        type: String
    },
    status: {
        type: String
    },
    department: {
        type: String
    },
    phone: {
        type: String
    },
    website: {
        type: String
    },
    addressline1: {
        type: String
    },
    addressline2: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    language: {
        type: String
    },
    postcode: {
        type: String
    },
    twiter: {
        type: String
    },
    facebook: {
        type: String
    },
    instagram: {
        type: String
    },
    zalo: {
        type: String
    }


}, { timestamps: true })
const User = mongoose.model("User", userSchema);
export default User;