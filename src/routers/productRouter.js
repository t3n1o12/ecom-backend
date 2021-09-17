import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Product from '../models/productModel.js';
import multer from 'multer';
//upload image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/product')
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
const productRouter = express.Router();
//product list

productRouter.post('/list', expressAsyncHandler(async (req, res) => {
    if (req.body.search) {
        const regex = new RegExp(req.body.search, 'i')
        const product = await Product.find({
            $or: [
                {
                    name: regex
                },
                {
                    category: regex,
                },
                {
                    sdescription: regex,
                },
            ],
            userCreate:req.body.userCreate
        })
        if(product){
            return res.send(product)
        }
        else{
            return res.status(404).send('Not found')
        }
    }
    if (req.body.category) {
        const product = await Product.find({
            category:req.body.category,
            userCreate:req.body.userCreate
        })
        if(product){
            return res.send(product)
        }
        else{
            return res.status(404).send('Not found')
        }
    }
    if (req.body.price) {
        const product = await Product.find({ price: { $gte:req.body.price[0], $lte: req.body.price[1] },userCreate:req.body.userCreate })
        if(product){
            return res.send(product)
        }
        else{
            return res.status(404).send('Not found')
        }
    }
    if (req.body.color) {
        const product = await Product.find({ color:req.body.color,userCreate:req.body.userCreate })
        if(product){
            return res.send(product)
        }
        else{
            return res.status(404).send('Not found')
        }
    }
    //{ "$ne": req.body.userCreate }
    const product = await Product.find({ "userCreate": req.body.userCreate }).limit(12).sort(req.body.sort ? { name: req.body.sort } : {createdAt:-1}).skip(req.body.skip ? req.body.skip : null);
    if (product) {
        res.send(product)
    }
    else {
        res.status(407).send({ message: 'Some thing not wrong' })
    }
}))
//add product
productRouter.post('/add', upload.array('image'), expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        sdescription: req.body.sdescription,
        price: req.body.price,
        countInStock: req.body.countInStock,
        image: req.files,
        userCreate: req.body.userCreate,
        sale: req.body.sale,
        fearture: req.body.fearture,
        description: req.body.description,
        color:req.body.color
    })
    const createdProduct = await product.save();
    res.send(createdProduct)


}))
//product detail 

productRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })
);
//product search 
productRouter.post('/search', expressAsyncHandler(async (req, res) => {
    if (isNaN(req.body.search)) {
        //not number
        const regex = new RegExp(req.body.search, 'i')
        const product = await Product.find({
            $or: [
                {
                    name: regex
                },
                {
                    category: regex,
                },
                {
                    sdescription: regex,
                },
            ],
            userCreate:req.body.userCreate
        })
        if (product === []) {
            res.status(403).send({
                message: 'nothing to show'
            })

        } else {
            res.send(product)
        }

    } else {
        res.status(403).send({
            message: 'you cant not search number'
        })
    }

}))
productRouter.get('/header/search', expressAsyncHandler(async (req, res) => {
    if (isNaN(req.query.search)) {
        //not number
        const regex = new RegExp(req.query.search, 'i')
        const product = await Product.find({
            $or: [
                {
                    name: regex
                },
                {
                    category: regex,
                },
                {
                    sdescription: regex,
                },
            ],
            
        })
        if (product === []) {
            res.status(403).send({
                message: 'nothing to show'
            })

        } else {
            res.send(product)
        }

    } else {
        res.status(403).send({
            message: 'you cant not search number'
        })
    }

}))
// edit a product
productRouter.put('/:id/edit',upload.array('image'),expressAsyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        product.name = req.body.name?req.body.name:product.name;
        product.category=req.body.category?req.body.category:product.category;
        product.sdescription=req.body.sdescription?req.body.sdescription:product.sdescription;
        product.price=req.body.price?req.body.price:product.price;
        product.countInStock = req.body.countInStock?req.body.countInStock:product.countInStock;
        product.fearture=req.body.fearture?req.body.fearture:product.fearture;
        product.sale= req.body.sale?req.body.sale:product.sale;
        product.description=req.body.description?req.body.description:product.description;
        product.color=req.body.color?req.body.color:product.color;
        product.image=req.files?req.files:product.image;
        const newProduct = await product.save();
        res.send(newProduct)
    }else{
        res.status(404).send({message:'not found product'})
    }
    
}))

//delet a product
productRouter.delete('/:id',expressAsyncHandler(async(req,res)=>{
     const product = await Product.findByIdAndRemove(req.params.id);
    if(product){
        res.send({message:'delete success'})
    }else{
        res.send({message:'delete fail'})
    }
}))
//add rating for product 
///////////this is for review



productRouter.post('/:id/comment/add', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    const review = product.review;
    if (review) {
        review.push({
            userId: req.body.userId,
            userName: req.body.userName,
            userAva: req.body.userAva,
            rating: req.body.rating,
            userComment: req.body.userComment
        })
        await product.save();
        res.send(review)
    } else {
        res.status(405).send({
            message: 'review not created yet :v'
        })

    }

}))

//delete comment
productRouter.delete('/:id/comment/delete', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    const reviewed = product.review.id(req.body.id)
    if (reviewed) {
        product.review.id(req.body.id).remove();
        product.save()
        res.send(product.review)
    } else {
        res.status(404).send({
            message: 'review not have yet :v'
        })
    }
}))
//get comment
productRouter.get('/:id/comment', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    const reviewed = product.review
    if (reviewed) {
        res.send(reviewed)
    } else {
        res.status(404).send({
            message: 'review not have yet :v'
        })
    }
}))
export default productRouter;