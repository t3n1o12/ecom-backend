import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    paymentDate:{ type: Date, required:true},
    paymentType:{type: String,
        enum: ["online", "payment after recieve"],
        default: "online",},
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
      },
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
      },
      paymentStatus:{
        type: String,
        enum: ["pendding","active"],
        
      },
    totalPayment:{
        type:Number, required:true
    }
})

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;