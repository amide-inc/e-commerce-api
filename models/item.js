const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title : {type : String, required : true, unique : true},
    thumbnail: {type: String, required: true},
    description :{type : String, required : true},
    price : {type: Number, required: true},
    product: {type: mongoose.Types.ObjectId},
    userId : {type: mongoose.Types.ObjectId , required : true}
});

module.exports = mongoose.model('Item', itemSchema);