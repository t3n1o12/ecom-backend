import express from 'express'
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler'
import multer from 'multer';

//token USER
const generateJwtToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/user')
    }
    ,
    filename: function (req, file, cb) {

        cb(null, file.originalname)
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

///list customer 
userRouter.get('/list', expressAsyncHandler(async (req, res) => {
    // res.send(req.query)
    const user = await User.find({
        role: "User"
    }).skip(req.query.page ? parseInt(req.query.page) : 0).limit(req.query.limit ? parseInt(req.query.limit) : null).sort(req.query.sort ? { name: parseInt(req.query.sort) } : null)
    if (user) {
        res.send(user)
    }
    else {
        res.status(404).send({
            message: 'Some thing wrong, user not found'
        })
    }

}))

userRouter.get('/search', expressAsyncHandler(async (req, res) => {
    // res.send(req.query)
    if (!req.query.search) {
        res.send(undefined)
    }
    const regex = new RegExp(req.query.search, 'i')
    const user = await User.find({
        role: "User",
        $or: [
            {
                name: regex
            },
            {
                email: regex,
            },

        ],
    })
    if (user) {
        res.send(user)
    }
    else {
        res.status(404).send({
            message: 'Some thing wrong, user not found'
        })
    }

}))
// search but header
userRouter.get('/header/search', expressAsyncHandler(async (req, res) => {
    // res.send(req.query)
    if (!req.query.search) {
        res.send(undefined)
    }
    const regex = new RegExp(req.query.search, 'i')
    const user = await User.find({
        $or: [
            {
                name: regex
            },
            {
                email: regex,
            },

        ],
    })
    if (user) {
        res.send(user)
    }
    else {
        res.status(404).send({
            message: 'Some thing wrong, user not found'
        })
    }

}))
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

//Sign up
userRouter.post('/signup', expressAsyncHandler(async (req, res) => {
    //check User ??
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
        if (user) {
            return res.status(400).json({ error: "User already resgistered" })
        }
    })
    const { firstName, lastName, email, password, userAva, role } = req.body
    const password_hash = await bcrypt.hash(password, 10);

    const _user = new User({
        firstName,
        lastName,
        userName: shortid.generate(),
        email,
        password_hash,
        userAva: "",
        role: 'User'
    });
    _user.save((error, user) => {
        if (error) {
            return res.status(400).json({
                message: "Something went wrong",
            });
        }

        if (user) {
            const token = generateJwtToken(user._id, user.role);
            const { _id, firstName, lastName, email, role, fullName } = user;
            return res.status(201).json({
                token,
                user: { _id, firstName, lastName, email, role, fullName },
            });
        }
    });
}
))
//user update basic infomation :v
userRouter.put('/:id', upload.single('userAva'), expressAsyncHandler(async (req, res) => {
    const newUser = await User.findById(req.params.id)
    if (newUser) {
        newUser.name = req.body.name ? req.body.name : newUser.name;
        newUser.userName = req.body.userName ? req.body.userName : newUser.userName;
        newUser.userAva = req.file ? req.file.path ? req.file.path : newUser.userAva : newUser.userAva;
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
        newUser.password = req.body.password ? req.body.password : newUser.password;
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

//gettt detail
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

