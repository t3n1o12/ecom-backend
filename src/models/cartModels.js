import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    name:{
        type:String
    },
    image:{
        type:Array
    },
    price:{
        type:Number,
        
    },
    countInStock:{
        type:Number
    },
    product:{
        type:String
    },
    qty:{
        type:Number
    }
})


const cartSchema = new mongoose.Schema({
    userCart:{
        type:String,
        required:true,
        unique:true,
    },
    
    cart:[cartsSchema]
},{timestamps:true})

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;