const { get } = require('./auth-route');

const router = require('express').Router();
const Product = require('../models/product');
const checkAuth = require('../middleware/check-auth');
const { json } = require('body-parser');

router.post('/', checkAuth, (req, res) => {
    const product =  new Product({
        title : req.body.title,
        description: req.body.description,
        thumbnail: req.body.thumbnail,
        keywords : req.body.keywords,
        userId: req.userData.userId
    })
    product.save()
           .then((result) => {
               res.json({success : true, message: "product has been created"});
           })
           .catch((err) => {
               if(err.code === 11000) {
                res.json({success : false, message: "Product already exits"});
               }else {
                res.json({success : false, message: "moongoos error"});
               }

           });
});

router.get('/', (req, res) => {
    Product.find()
           .exec()
           .then((result) => {
               res.json({success : true, data: result})
           })
           .catch((err) =>{
               res.json({success : false, message: err});
           })
});

router.patch('/:id', checkAuth, (req, res) => {
    const productId = req.params.id;
    const data = req.body;
    Product.updateOne({_id: productId}, {$set : data})
           .exec()
           .then((result) => {
               res.json({success : true, message: "data has  been updated"});
           })
           .catch((error) => {
               res.json({success : false, message: error })
           })


})

router.delete('/:id', checkAuth, (req, res) => {
    const productId = req.params.id;
    Product.deleteOne({_id: productId})
           .exec()
           .then((result) => {
               res.json({success : true, message: "data has been deleted"})
           }).catch((err) => {
               res.json({success: false, message: err})
           })
});


module.exports = router;


