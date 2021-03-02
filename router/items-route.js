const router = require('express').Router();
const Item = require('../models/item');
const checkAuth =  require('../middleware/check-auth');
const { route } = require('./product-route');
router.post('/', checkAuth, (req, res) => {
    const item = new Item({
        title : req.body.title,
        thumbnail: req.body.thumbnail,
        description : req.body.description,
        price : req.body.price,
        product: req.body.product,
        userId : req.userData.userId
    });

    item.save()
        .then((err) => {
            res.json({success : true, message: 'Item has been listed'})
        })
        .catch((err) => {
           if(err.code == 11000) {
               res.json({success: false, message: 'Item is already exists' })
           }else {
               res.json({success: false, message: err})
           }
        })
})

router.get('/', (req, res) => {
    Item.find({})
        .populate('product', 'title description thumbnail')
        .exec()
        .then((result) => {
            if(result.length > 0) {
                res.json({success: true, data: result});
            }else {
                res.json({success : false, message: "no data found"});
            }
        })
        .catch((err) => {
            res.json({success : false, message: err});
        })
})
router.get('/:id', (req ,res) => {
    const itemId = req.params.id;
    Item.findOne({_id : itemId})
    .populate('product', 'title description thumbnail')
    .exec()
    .then((result) => {
        if(result) {
            res.json({success: true, data: result});
        }else {
            res.json({success: false, message: 'item not found'});
        }
    })
    .catch((err) => {
        res.json({success : false, message: err});
    })
})

router.patch('/:id' , (req, res) => {
  //home work
});

router.delete('/:id', (req, res) => {
    //home work
});

module.exports = router;