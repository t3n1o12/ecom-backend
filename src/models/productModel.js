import mongoose from "mongoose";
import Category from "./categoryModel";

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

const reviewShema = new mongoose.Schema({
  userId:{
      type:String, 
      
  },
  userName:{
      type:String,
      
  },
  userAva:{
      type:String,
      
  },
  rating:{
      type:Number,
      
  },
  userComment:{
      type:String,
     
  },
});
const variantSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  sku: {
    type: String,
    require: true
  },
  //size
  option1: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    required: true,
  },
  //color?
  option2: {
    type: String,
    default: null
  },
  weight: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  inventoryQly: {
    type: Number,
    required: true,
  }
})
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
    category: [Category],
    description: {
      type: String,
    },

    brand: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      enum: ["unisex", "male", "female"],
      default: "unisex",

    },
    origin: {

      type: String,
      enum: ["Viet Nam", "Thai Lan", "Korea", "Japan", "USA", "another"],
      required: true
    },
    material: {
      type: String,
      require: true
    },
    sellInfor: {
      variants: [
        variantSchema
      ]
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
    }
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);

export default Product;
