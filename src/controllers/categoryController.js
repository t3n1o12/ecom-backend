import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel";
import slugify from "slugify";
import Category from './../models/categoryModel';


// create 
const createCategories = (categories, parentId = null) => {
    const CategoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined);
    } else {
        category = categories.filter(cat => cat.parentId == parentId)
    }

    for(let cate of category){
        CategoryList.push({
            _id: cate._id,
            name : cate.name,
            slug: cate.slug,
            children: createCategories(categories, cate._id)
        })
    }
    return CategoryList
}
// add categories
const addCategory = asyncHandler(async (req, res) => {
    const cateObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    if (req.body.parentId) {
        cateObj.parentId = req.body.parentId
    }

    const cate = new Category(cateObj);
    cate.save((error, category) => {
        if (error) return res.status(400).json({ error });
        if (category) {
            return res.status(201).json({ category });
        }
    })
})

//Get category
const getCategory = asyncHandler(async (req, res) => {
    Category.findOne({}).exec((error, categories) => {
        if (error) return res.status(400).json({ error });
        if (categories) {
            const categoryList =  createCategories(categories)
            return res.status(200).json({categoryList})
        }
    })
})



export { addCategory, getCategory }