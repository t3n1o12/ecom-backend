import express from 'express'
import Message from '../models/messageModel.js';
import expressAsyncHandler from 'express-async-handler'
const messageRouter = express.Router();


messageRouter.post('/', expressAsyncHandler(async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.send(savedMessage)
  } catch (error) {
    res.status(500).json(error)
  }

}))

//get message of a user 

messageRouter.get('/:conversationId', expressAsyncHandler(async(req,res)=>{
  try{
    const messages = await Message.find({
      conversationId:req.params.conversationId,
    })
    res.send(messages)
  }catch(err){  
    res.status(500).json(err)
  }

}))


export default messageRouter;