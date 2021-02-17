const { get } = require('./product-route');

const router = require('express').Router();
const userSchema = require('../models/user');

router.post('/signup', (req, res) => {
    const user = new userSchema({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password
    });
    user.save()
        .then((response) => {
            res.json({success : true, message: 'Account has been created'})
        })
        .catch((err) => {
            if(err.code === 11000) {
                res.json({success: false, messsage: 'email id already exits'});
            }else{
                res.json({success: false, messsage: err});
            }
        })

});

module.exports = router;