const { get } = require('./product-route');

const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkAuth = require('../middleware/check-auth');

router.get('/profile', checkAuth, (req, res) => {
  
  User.findOne({_id: req.userData.userId})
      .then((result) => {
          res.json({success: true, data: result});
      })
      .catch((err) => {
          res.json({success : false, message: 'Server error'});
      })
});


router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then((result) => {
            if (result) {
               bcrypt.compare(req.body.password, result.password, function(err, b) {
                   if(b) {
                     jwt.sign({userId: result._id},  'aminkey', function(e, token) {
                         if(e) {
                            return res.json({success: false, message: 'Token issue'})
                         }else{
                           return res.json({success: true, token: token})
                         }
                     });
                   }else {
                    return res.json({success: false, message: 'Password not matched'});
                   }
               })
            } else {
                return res.json({ success: false, message: 'User not found' });
            }
        })
        .catch((err) => {
            res.json({ success: false, message: 'Auth failed' });
        })
});

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            return res.json({ success: false, message: 'encrtption not working' })
        }
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            email: req.body.email,
            password: hash
        });
        user.save()
            .then((response) => {
                res.json({ success: true, message: 'Account has been created' })
            })
            .catch((err) => {
                if (err.code === 11000) {
                    res.json({ success: false, messsage: 'email id already exits' });
                } else {
                    res.json({ success: false, messsage: err });
                }
            })

    });


});

module.exports = router;