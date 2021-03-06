import express from 'express';
import multer from 'multer';
import shortid from 'shortid';
import { requireSignin, userMiddleware } from '../common-middleware/index.js';
import { addProduct, deleteProduct, getProductById, productList, searchProduct, updateProduct } from '../controllers/productController.js';


//upload image
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
const router = express.Router();
//add Product
router.post(
    '/create',
    requireSignin,
    // userMiddleware,
    upload.array('productPicture'),
    addProduct
);
//get Product
router.get(
    '/:id',
    requireSignin,
    getProductById
);
// get alll product

router.post(
    '/list',
    requireSignin,
    productList
);
// Edit Product
router.put(
    '/:id/edit',
    requireSignin,
    upload.array('productPicture'),
    updateProduct
);

// Delete Product
router.delete(
    '/:id',
    requireSignin,
    deleteProduct
);

//API Search Product
router.get('/search/:search',
    requireSignin,
    searchProduct
);
export default router;





// productRouter.post('/list', expressAsyncHandler(async (req, res) => {
//     if (req.body.search) {
//         const regex = new RegExp(req.body.search, 'i')
//         const product = await Product.find({
//             $or: [
//                 {
//                     name: regex
//                 },
//                 {
//                     category: regex,
//                 },
//                 {
//                     description: regex,
//                 },
//             ],
//             userCreate: req.body.userCreate
//         })
//         if (product) {
//             return res.send(product)
//         }
//         else {
//             return res.status(404).send('Not found')
//         }
//     }
//     if (req.body.category) {
//         const product = await Product.find({
//             category: req.body.category,
//             userCreate: req.body.userCreate
//         })
//         if (product) {
//             return res.send(product)
//         }
//         else {
//             return res.status(404).send('Not found')
//         }
//     }
//     if (req.body.price) {
//         const product = await Product.find({ price: { $gte: req.body.price[0], $lte: req.body.price[1] }, userCreate: req.body.userCreate })
//         if (product) {
//             return res.send(product)
//         }
//         else {
//             return res.status(404).send('Not found')
//         }
//     }
//     if (req.body.color) {
//         const product = await Product.find({ color: req.body.color, userCreate: req.body.userCreate })
//         if (product) {
//             return res.send(product)
//         }
//         else {
//             return res.status(404).send('Not found')
//         }
//     }
//     //{ "$ne": req.body.userCreate }
//     const product = await Product.find({ "userCreate": req.body.userCreate }).limit(12).sort(req.body.sort ? { name: req.body.sort } : { createdAt: -1 }).skip(req.body.skip ? req.body.skip : null);
//     if (product) {
//         res.send(product)
//     }
//     else {
//         res.status(407).send({ message: 'Some thing not wrong' })
//     }
// }))
//add product
            // productRouter.post('/add', upload.array('productPicture'), expressAsyncHandler(async (req, res) => {
            //     const {
            //         name, category, description,
            //         brand, sex, origin, material, variant,
            //         review, numReviews, createdBy, fearture, sale
            //     } = req.body;
            //     let productPicture = []

            //     if (req.files.length > 0) {
            //         productPicture = req.files.map(file => { return { img: file.filename } })
            //     }
            //     const product = new Product(
            //         {
            //             name: name,
            //             slug: slugify(name),
            //             category, description,
            //             productPicture, variant,
            //             brand, sex, origin, material,
            //             review, numReviews, createdBy, fearture, sale
            //         }
            //     )
            //     product.save((error, product) => {
            //         if (error) return res.status(400).json(error)
            //         if (product) {
            //             res.status(200).json({ product })
            //         }
            //     })


            // }))
//product detail 

            // productRouter.get(
            //     '/:id',
            //     expressAsyncHandler(async (req, res) => {
            //         const product = await Product.findById(req.params.id)
            //         if (product) {
            //             res.send(product);
            //         } else {
            //             res.status(404).send({ message: 'Product Not Found' });
            //         }
            //     })
// );
//product search 
    // productRouter.post('/search', expressAsyncHandler(async (req, res) => {
    //     if (isNaN(req.body.search)) {
    //         //not number
    //         const regex = new RegExp(req.body.search, 'i')
    //         const product = await Product.find({
    //             $or: [
    //                 {
    //                     name: regex
    //                 },
    //                 {
    //                     category: regex,
    //                 },
    //                 {
    //                     description: regex,
    //                 },
    //             ],
    //             userCreate: req.body.userCreate
    //         })
    //         if (product === []) {
    //             res.status(403).send({
    //                 message: 'nothing to show'
    //             })

    //         } else {
    //             res.send(product)
    //         }

    //     } else {
    //         res.status(403).send({
    //             message: 'you cant not search number'
    //         })
    //     }

    // }))
    // productRouter.get('/header/search', expressAsyncHandler(async (req, res) => {
    //     if (isNaN(req.query.search)) {
    //         //not number
    //         const regex = new RegExp(req.query.search, 'i')
    //         const product = await Product.find({
    //             $or: [
    //                 {
    //                     name: regex
    //                 },
    //                 {
    //                     category: regex,
    //                 },
    //                 {
    //                     sdescription: regex,
    //                 },
    //             ],

    //         })
    //         if (product === []) {
    //             res.status(403).send({
    //                 message: 'nothing to show'
    //             })

    //         } else {
    //             res.send(product)
    //         }

    //     } else {
    //         res.status(403).send({
    //             message: 'you cant not search number'
    //         })
    //     }

// }))
// edit a product
    // productRouter.put('/:id/edit', upload.array('image'), expressAsyncHandler(async (req, res) => {
    //     const product = await Product.findById(req.params.id)
    //     // console.log(req.body.name)
    //     if (product) {
    //         product.name = req.body.name ? req.body.name : product.name;
    //         product.category = req.body.category ? req.body.category : product.category;
    //         product.userCreate = req.body.userCreate ? req.body.userCreate : product.userCreate;
    //         product.description = req.body.description ? req.body.description : product.description;
    //         product.origin = req.body.origin ? req.body.origin : product.origin;
    //         product.material = req.body.material ? req.body.material : product.material;
    //         // product.sellInfor = req.body.sellInfor ? req.body.sellInfor : product.sellInfor;
    //         product.variants = req.body.variants ? req.body.variants : product.variants;
    //         product.numReviews = req.body.numReviews ? req.body.numReviews : product.numReviews;
    //         product.fearture = req.body.fearture ? req.body.fearture : product.fearture;
    //         product.sale = req.body.sale ? req.body.sale : product.sale;
    //         product.image = req.files ? req.files : product.image;
    //         const newProduct = await product.save();
    //         res.send(newProduct)
    //     } else {
    //         res.status(404).send({ message: 'not found product' })
    //     }

    // }))

//delet a product
    // productRouter.delete('/:id', expressAsyncHandler(async (req, res) => {
    //     const product = await Product.findByIdAndRemove(req.params.id);
    //     if (product) {
    //         res.send({ message: 'delete success' })
    //     } else {
    //         res.send({ message: 'delete fail' })
    //     }
    // }))
//add rating for product 
///////////this is for review



// productRouter.post('/:id/comment/add', expressAsyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id)
//     const review = product.review;

//     if (review) {
//         review.push({
//             userId: req.body.userId,
//             userName: req.body.userName,
//             userAva: req.body.userAva,
//             rating: req.body.rating,
//             userComment: req.body.userComment
//         })
//         await product.save();
//         res.send(review)
//     } else {
//         res.status(405).send({
//             message: 'review not created yet :v'
//         })

//     }

// }))

// //delete comment
// productRouter.delete('/:id/comment/delete', expressAsyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id)
//     const reviewed = product.review.id(req.query.id)

//     if (reviewed) {
//         product.review.id(req.query.id).userComment = '';
//         product.review.id(req.query.id).response = [];
//         product.save()
//         res.send(product.review)
//     } else {
//         res.status(404).send({
//             message: 'review not have yet :v'
//         })
//     }
// }))
// //get comment
// productRouter.get('/:id/comment', expressAsyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id)
//     const reviewed = product.review
//     if (reviewed) {
//         res.send(reviewed)
//     } else {
//         res.status(404).send({
//             message: 'review not have yet :v'
//         })
//     }
// }))
// ///response 
// productRouter.post('/:id/response/add', expressAsyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id)
//     const response = product.review[req.body.stt].response;
//     if (response) {
//         response.push({
//             userId: req.body.userId,
//             userName: req.body.userName,
//             userAva: req.body.userAva,
//             userComment: req.body.userComment
//         })
//         await product.save();
//         res.send(response)
//     } else {
//         res.status(405).send({
//             message: 'review not created yet :v'
//         })

//     }

// }))
// //get, but not useful yet
// productRouter.get('/:id/response/stt', expressAsyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id)
//     const response = product.review[req.query.stt].response;
//     if (response) {
//         res.send(response)
//     } else {
//         res.status(405).send({
//             message: 'review not created yet :v'
//         })

//     }

// }))
// //delete

