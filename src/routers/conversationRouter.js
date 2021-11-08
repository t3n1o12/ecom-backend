import express from 'express'
import Conversation from "../models/conversationModel.js";
import expressAsyncHandler from 'express-async-handler'
const conversationRouter = express.Router();


conversationRouter.post('/', expressAsyncHandler(async (req, res) => {
  const newConverSation = new Conversation({
    members: [req.body.senderId, req.body.receiverId]
  })

  try {
    const savedConversation = await newConverSation.save();
    res.send(savedConversation)
  } catch (error) {
    res.status(500).json(error)
  }

}))

//get conversation of a user 

conversationRouter.get('/:userId', expressAsyncHandler(async(req,res)=>{
  
  try{
    const conversation = await Conversation.find({
      members:{$in:[req.params.userId]},
    })
    res.send(conversation)
  }catch(err){
    res.status(500).json(err)
  }


}))


export default conversationRouter;