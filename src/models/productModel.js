<<<<<<< HEAD
import mongoose from "mongoose";
=======
import mongoose from 'mongoose';

const responseSchema = new  mongoose.Schema({
    userId:{
        type:String, 
        
    },
    userName:{
        type:String,
        
    },
    userAva:{
        type:String,
        
    },
    userComment:{
        type:String,
       
    }
})
>>>>>>> b0fd171e45ef7676d818f610103eddb28166ec04

const reviewShema = new mongoose.Schema({
  userId: {
    type: String,
  },
  userName: {
    type: String,
  },
  userAva: {
    type: String,
  },
  rating: {
    type: Number,
  },
  userComment: {
    type: String,
  },
  disable: {
    type: Boolean,
  },
});
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
    },
    sdescription: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
<<<<<<< HEAD
    countInStock: {
      type: Number,
      required: true,
=======
    response:[responseSchema],
    disable:{
        type:Boolean,
      
    }
})
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
>>>>>>> b0fd171e45ef7676d818f610103eddb28166ec04
    },
    review: [reviewShema],
    numReviews: {
      type: Number,
    },
    userCreate: {
      type: String,
    },
    fearture: {
      type: String,
    },
    sale: {
      type: Number,
    },
    description: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);

export default Product;
