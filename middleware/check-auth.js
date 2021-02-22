const jwt  = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const  token =  req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, 'aminkey');
        req.userData  = decode;
        next();
    }catch(error) {
        return res.json({success: false, message : 'Secure route, Kidnly login first'});
    }
}