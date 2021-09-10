import express from 'express'
import Cart from '../models/cartModels.js';
import expressAsyncHandler from 'express-async-handler'
const cartRouter = express.Router();

//tao moi gio hang

cartRouter.post('/new',expressAsyncHandler(async(req,res)=>{
    const cart = await Cart.findOne({
        userCart:req.body.userCart
    })
    
    if(cart===null){
        const newCart = new Cart({
            userCart:req.body.userCart,
            cart:[]
        })
        const carted = await newCart.save()
        res.send(carted)
    }else{
        res.status(401).send({
            message:'have cart'
        })
    }
    
}))
///them vao gio hang
cartRouter.put('/',expressAsyncHandler(async(req,res)=>{
  const cart = await Cart.findOne({
      userCart:req.body.userCart
  })
    
  if(cart){
    if(cart.cart.find(x=>x.product===req.body.cart.product)){
        res.status(401).send({
            message:'Duplicate produdct'
        })
    }else{
        cart.cart.push(req.body.cart)
        const carted = await cart.save();
        res.send(carted)
    }
  }else{
    const cart = new Cart({
        userCart:req.body.userCart,
        cart:[]
    })
    cart.cart.push(req.body.cart)
    const carted = await cart.save();
    res.send(carted)
  }
}));
//get gio hang :v
cartRouter.post('/cart',expressAsyncHandler(async(req,res)=>{
    const cart = await Cart.findOne({
        userCart:req.body.userCart
    })
   
    if(cart){
         res.send(cart)   
         return
    }else{
        res.status(407).send({
            message:'Not created Cart yet haha'
        })  
    }
  }));
  //delete
cartRouter.put('/delete', expressAsyncHandler(async(req,res)=>{
    const cart = await Cart.findOne({
        userCart:req.body.userCart
    })
    const deleteCart = cart.cart.id(req.body.id);
    if(deleteCart){
        deleteCart.remove();
        cart.save();
         res.send(cart)
    }else{
        res.status(404).send({
            message:'not found cart'
        })
    }
    
 
}))
export default cartRouter;