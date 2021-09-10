import express from 'express'
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler'
import multer from 'multer';




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/user')
    }
    ,
    filename: function (req, file, cb) {
        
        cb(null,  file.originalname)
    }
})
const fileFilterr = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilterr
})
const userRouter = express.Router();



userRouter.get('/seed', expressAsyncHandler(async (req, res) => {

}));
userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })

    if (user) {
        if (req.body.password === user.password) {
            res.send(user);
        }

    }
    else {
        res.status(401).send({
            message: 'invalid email'
        })
    }

}))
userRouter.post('/signup', expressAsyncHandler(async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        userAva: '',
        role:'User'
    });
    const createdUser = await user.save();

    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        userAva: createdUser.userAva,
        password:createdUser.password
    })
}))
//user update basic infomation :v
userRouter.put('/:id', upload.single('userAva'), expressAsyncHandler(async (req, res) => {
    const newUser = await User.findById(req.params.id)
    if (newUser) {
        newUser.name = req.body.name ? req.body.name : newUser.name;
        newUser.userName = req.body.userName ? req.body.userName : newUser.userName;
        newUser.userAva = req.file? req.file.path ? req.file.path : newUser.userAva:newUser.userAva;
        newUser.birth = req.body.birth ? req.body.birth : newUser.birth;
        newUser.sex = req.body.sex ? req.body.sex : newUser.sex;
        newUser.role = req.body.role ? req.body.role : newUser.role;
        newUser.status = req.body.status ? req.body.status : newUser.status;
        newUser.department = req.body.department ? req.body.department : newUser.department;
        newUser.phone = req.body.phone ? req.body.phone : newUser.phone;
        newUser.website = req.body.website ? req.body.website : newUser.website;
        newUser.addressline1 = req.body.addressline1 ? req.body.addressline1 : newUser.addressline1;
        newUser.addressline2 = req.body.addressline2 ? req.body.addressline2 : newUser.addressline2;
        newUser.city = req.body.city ? req.body.city : newUser.city;
        newUser.country = req.body.country ? req.body.country : newUser.country;
        newUser.language = req.body.language ? req.body.language : newUser.language;
        newUser.postcode = req.body.postcode ? req.body.postcode : newUser.postcode;
        newUser.twiter = req.body.twiter ? req.body.twiter : newUser.twiter;
        newUser.facebook = req.body.facebook ? req.body.facebook : newUser.facebook;
        newUser.instagram = req.body.instagram ? req.body.instagram : newUser.instagram;
        newUser.zalo = req.body.zalo ? req.body.zalo : newUser.zalo;
        newUser.password = req.body.password?req.body.password:newUser.password;
    }
    const user = await newUser.save();

    if (user) {
        res.send(user)
    } else {
        res.status(409).send({
            message: 'cant save'
        })
    }

}))

//gettt
userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        res.send(user)
    }
    else {
        res.status(404).send({
            message: 'valid id'
        })
    }
}))
export default userRouter;