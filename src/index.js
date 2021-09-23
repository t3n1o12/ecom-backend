import express from "express";
import mongoose from "mongoose";
import cartRouter from "./routers/cartRouter.js";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
// import orderRouter from "./routers/orderRouter.js";
import customerRouter from "./routers/customerRouter.js";
import morgan from "morgan";

const app = express();
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/ekafekin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//chay server
app.get("/", (req, res) => {
  res.send("Server is running");
});
//share upload forder
app.use("/upload", express.static("upload"));
// dung userROuter
app.use("/api/users", userRouter);
// dung productRouter
app.use("/api/products", productRouter);
//cart
app.use("/api/carts", cartRouter);
//order
// app.use("/api/orders", orderRouter);
//customer
app.use("/api/customers", customerRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(5000, () => {
  console.log("Server is ready at http://localhost:5000");
});
