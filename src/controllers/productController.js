import asyncHandler from "express-async-handler";
import multer from 'multer';
import shortid from 'shortid';
import slugify from 'slugify';
import Product from '../models/productModel';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/product')
    }
    ,
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
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

// ADD PRODUCT
const addProduct = asyncHandler(async (req, res) => {
    const {
        name, category, description,
        brand, sex, origin, material, variant,
        review, numReviews, createdBy, fearture, sale
    } = req.body;
    let productPicture = []
    // console.log(createdBy, req.user)
    if (req.files.length > 0) {
        productPicture = req.files.map(file => { return { img: file.filename } })
    }
    const product = new Product(
        {
            name: name,
            slug: slugify(name),
            category, description,
            productPicture, variant,
            brand, sex, origin, material,
            review, numReviews, createdBy: req.user._id, fearture, sale
        }
    )
    product.save((error, product) => {
        if (error) return res.status(400).json(error)
        if (product) {
            res.status(200).json({ product })
        }
    })

})

// GET PRODUCT By ID
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
})
// UPDATE PRODUCT
const updateProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)
    // console.log(req.body.name)
    if (product) {
        product.name = req.body.name ? req.body.name : product.name;
        product.category = req.body.category ? req.body.category : product.category;
        product.userCreate = req.body.userCreate ? req.body.userCreate : product.userCreate;
        product.description = req.body.description ? req.body.description : product.description;
        product.origin = req.body.origin ? req.body.origin : product.origin;
        product.material = req.body.material ? req.body.material : product.material;
        // product.sellInfor = req.body.sellInfor ? req.body.sellInfor : product.sellInfor;
        product.variants = req.body.variants ? req.body.variants : product.variants;
        product.numReviews = req.body.numReviews ? req.body.numReviews : product.numReviews;
        product.fearture = req.body.fearture ? req.body.fearture : product.fearture;
        product.sale = req.body.sale ? req.body.sale : product.sale;
        product.image = req.files ? req.files : product.image;
        const newProduct = await product.save();
        res.send(newProduct)
    } else {
        res.status(404).send({ message: 'not found product' })
    }


})

// DELETE PRODUCT   
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (product) {
        res.send({ message: 'delete success' })
    } else {
        res.send({ message: 'delete fail' })
    }
})

// SEARCH PRODUCT
const searchProduct = asyncHandler(async (req, res) => {
    if (isNaN(req.params.search)) {
        //not number
        const regex = new RegExp(req.params.search, 'i')
        const product = await Product.find({
            $or: [
                {
                    name: regex
                },
                {
                    description: regex,
                },
            ]
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
})

// PRODUCT LIST

const productList = asyncHandler(async (req, res) => {
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
                    description: regex,
                },
            ],
            userCreate: req.body.userCreate
        })
        if (product) {
            return res.send(product)
        }
        else {
            return res.status(404).send('Not found')
        }
    }
    if (req.body.category) {
        const product = await Product.find({
            category: req.body.category,
            userCreate: req.body.userCreate
        })
        if (product) {
            return res.send(product)
        }
        else {
            return res.status(404).send('Not found')
        }
    }
    if (req.body.price) {
        const product = await Product.find({ price: { $gte: req.body.price[0], $lte: req.body.price[1] }, userCreate: req.body.userCreate })
        if (product) {
            return res.send(product)
        }
        else {
            return res.status(404).send('Not found')
        }
    }
    if (req.body.color) {
        const product = await Product.find({ color: req.body.color, userCreate: req.body.userCreate })
        if (product) {
            return res.send(product)
        }
        else {
            return res.status(404).send('Not found')
        }
    }
    //{ "$ne": req.body.userCreate }
    const product = await Product.find({ "userCreate": req.body.userCreate }).limit(12).sort(req.body.sort ? { name: req.body.sort } : { createdAt: -1 }).skip(req.body.skip ? req.body.skip : null);
    if (product) {
        res.send(product)
    }
    else {
        res.status(407).send({ message: 'Some thing not wrong' })
    }
})
export {
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProduct,
    productList
};
