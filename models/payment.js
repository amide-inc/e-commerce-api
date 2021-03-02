const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
   item : {type: mongoose.Types.ObjectId, required: true, ref: 'Item'},
   user : {type: mongoose.Types.ObjectId, required: true, ref:'User'},
   orderId : {type: String, required: true},
   paymentId : {type: String},
   price : {type:Number},
   status: {type: Boolean, default: false},
   created_at: {type: Date, default: new Date()},
   upadate_at: {type: Date, default: new Date()},
});

module.exports = mongoose.model('Payment', itemSchema);