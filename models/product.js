const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title : {type : String, required : true, unique : true},
    thumbnail: {type: String, required: true},
    description :{type : String, required : true},
    keywords: {type: String}, //coma seprated String like , fashion, cloths,cotton 
    userId : {type: mongoose.Types.ObjectId , required : true}
});

module.exports = mongoose.model('Product', productSchema);