import jwt from 'jsonwebtoken'
import multer from 'multer'
import shortid from 'shortid'
import path from 'path'
import User from '../models/userModel'
import asyncHandler from "express-async-handler";

//upload image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

//AUTH login
const requireSignin = asyncHandler(async (req, res, next) => {
    // if (req.headers.authorization) {
    //     const token = req.headers.authorization.split(" ")[1];
    //     const user = jwt.verify(token, process.env.JWT_SECRET);
    //     req.user = user;
    // } else {
    //     return res.status(400).json({ message: "Authorization required" });
    // }
    // next();
    // jwt.decode()

let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
             token = req.headers.authorization.split(" ")[1];
            // console.log(token)
            //decodes token id
            // const user = jwt.verify(token, "baomat");
            const decode = jwt.verify(token, "baomat");
            console.log(decode)
            req.user = decode
            // console.log(req.user)
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }

})

const userMiddleware = (req, res, next) => {
    if (req.user.role !== "User") {
        return res.status(400).json({ message: "User access denied" });
    }
    next();
};

export {
    upload,
    requireSignin,
    userMiddleware

}