const Product = require('../models/product');
const Category = require('../models/category')
const shortid = require('shortid');
const slugify = require('slugify');

exports.createProduct = (req, res) => {
    // res.status(200).json({file: req.files, body: req.body});
    const {
        name, price, description, category, quantity, createdBy
    } = req.body;

    let productPictures = [];
    if(req.files.length > 0){
        productPictures = req.files.map(file => {
            return {img: file.filename}
        });
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user._id

    });
    product.save((error, product) => {
        if(error) return res.status(400).json({error});
        if(product){
            res.status(201).json({product});
        }
    })
}

exports.getProductBySlug = (req, res) => {
    const {slug} = req.params;
    Category.findOne({slug}).exec((error, category) => {
        if(error){
            return res.status(400).json({error})
        }
        if(error){
            Product.find({category: category._id})
            .exec((error, products) => {
                res.status(200).json({
                    products,
                    productsByPrice: {
                        under500k: products.filter(product => product.price <= 500000),
                        under1000k: products.filter(product => product.price > 500000 && product.price <= 10000000),
                    }
                })
            })
        }
    });
}