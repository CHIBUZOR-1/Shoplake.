const productModel = require('../models/products');
const Mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { default: mongoose } = require('mongoose');

const addProduct = async (req, res) => {
    try {
        //let image_filename = `${req.file.filename}`;
        const {product_name, brand_name, description, old_price, new_price, category, sub_category, quantity} = req.body;
        if(!product_name) {
            return res.send({error: 'name required'});
        }
        if(!brand_name) {
            return res.send({error: 'brand_name required'});
        }
        if(!description) {
            return res.send({error: 'description required'});
        }
        if(!old_price) {
            return res.send({error: 'old_price required'});
        }
        if(!new_price) {
            return res.send({error: 'new_price required'});
        }
        if(!category) {
            return res.send({error: 'category required'});
        }
        if(!sub_category) {
            return res.send({error: 'sub_category required'});
        }
        if(!quantity) {
            return res.send({error: 'quantity required'});
        }
        const product = await new productModel({
            product_name,
            brand_name,
            description,
            old_price,
            new_price,
            image: req.file.filename,
            category,
            sub_category,
            quantity
        }).save();
        res.json({
            success: true,
            error: false,
            message: "Product Added"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: true,
            message: "Unable to add Product"
        })
    }
}


const productList = async (req, res) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortOrder = req.query.sort === 'asc' ? 1 : -1;
        const query= {};
        if (req.query.src) {
            query.$or = [
                {category: {$regex: req.query.src, $options: "i"}},
                {sub_category: {$regex: req.query.src, $options: "i"}},
                {product_name: {$regex: req.query.src, $options: "i"}}
            ];
        }
        // Price filter
        if (req.query.price && req.query.price.length) {
            const [minPrice, maxPrice] = req.query.price.split('-').map(Number);
            console.log([minPrice, maxPrice])
            query.new_price = {$gte: minPrice, $lte: maxPrice};
        }

        // Handle checkbox filters (brand_name)
        if (req.query.brand && req.query.brand.length > 0) {
            query.brand_name = { $in: req.query.brand.split('--') };
        }
        const products = await productModel.find(query).sort({createdAt: sortOrder}).skip(startIndex).limit(limit);
        const totalProducts = await productModel.countDocuments(query);
        const now = new Date();
        const oneMonthAgo= new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthProducts = await productModel.countDocuments({
            ...query,
            createdAt: { $gte: oneMonthAgo },
        });
        res.json({
            success: true,
            message: "Retrieved Product List",
            products,
            totalProducts,
            lastMonthProducts
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error retrieving product list"
        })
    }

 }

 const contextList = async (req, res) => {
    try {
        const contxtLst = await productModel.find({});
        res.status(200).json({
            ok: true,
            msg: 'found',
            contxtLst
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error retrieving product list"
        })
    }
 }

 const updateProduct = async (req, res) => {
    try {
        const {nowOld, nowNew, newQuantity, newSub_category} = req.body;
        
        if(!nowOld) {
            return res.send({error: 'old price required'});
        }
        if(!nowNew) {
            return res.send({error: 'new price required'});
        }
        if(!newQuantity) {
            return res.send({error: 'new quantity required'});
        }
        if(!newSub_category) {
            return res.send({error: 'new sub category required'});
        }
        const productUpdate = await productModel.findByIdAndUpdate(req.params.id, {
            old_price: nowOld,
            new_price: nowNew,
            quantity: newQuantity,
            sub_category: newSub_category
        }, {new: true});
        res.json({
            success: true,
            error: false,
            message: "Product Update Successful"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: true,
            message: "Unable to update Product"
        })
    }
 }

const getProductDetails = async(req, res)=> {
    try {
        const { id } = req.body;
        const product = await productModel.findById(id);
        res.json({
            data: product,
            success: true,
            error: false
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            success:false,
            message: "An error occurred!"
        })
    }
}

const getProductCategories = async (req, res) => {
    try {
        const categoryTabs = await productModel.distinct('sub_category');
        const catTabList = [];

        for (const sub_category of categoryTabs) {
            const product = await productModel.findOne({sub_category});
            if(product) {
                catTabList.push(product)
            }
        }

        res.json({
            success: true,
            message: "Product categories",
            data: catTabList,
            error: false
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            message: "An error occured",
            success: false
        })
    }
}

const cardsByCartegory = async (req, res) => {
    try {
        const { gt_category } = req.body;
        const product = await productModel.find({ sub_category:gt_category });
        res.json({
            success: true,
            data: product,
            error: false
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            success: false,
            message: 'An error occured'
        })
    }
}


/*const cateProducts = async (req, res) => {
    try {
        const {que} = req.body;
        const result = await productModel.find({sub_category: que});
        res.json({
            data: result,
            success:true,
            error: true
        }); 
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: true
        });
    }
}*/


// sub_category and price filter

const c_and_p_filter = async(req, res) => {
    try {
        const {checked, radio, que} = req.body;
        let args = {};
        if(que)  args.sub_category = que;
        if(checked.length > 0) args.brand_name = checked;
        if(radio.length) args.new_price = {$gte: radio[0], $lte: radio[1]}
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            data: products
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: true,
            message: "Error filtering products"
        })
    }
}
const cateProducts = async (req, res) => {
    try {
        const { que, price, brand } = req.query;
        console.log(que)

        // Initialize query to filter by sub_category
        const query = { sub_category: que };

        // Handle price filter
        if (price && price.length) {
            const [minPrice, maxPrice] = price.split('-').map(Number);
            query.new_price = { $gte: minPrice, $lte: maxPrice };
        }

        // Handle brand filter
        if (brand && brand.length > 0) {
            query.brand_name = { $in: brand.split('--') };
        }

        // Fetch filtered products
        const result = await productModel.find(query);
        res.json({
            result,
            success: true,
            error: false, // Correcting the `error` flag
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: true
        });
    }
};

const removeProduct = async (req, res) => { 
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        if(product) {
          res.json({
            success: true,
            message: "deleted Successfully",
          });  
        } else {
            res.json({
              success: true,
              message: "delete Usuccessful"
            });
        }
          
        
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message: "Error in Deleting file",
            error: true
        })
    }
 }

module.exports = {addProduct, contextList, productList, updateProduct, cateProducts, c_and_p_filter, getProductDetails, removeProduct, getProductCategories, cardsByCartegory }