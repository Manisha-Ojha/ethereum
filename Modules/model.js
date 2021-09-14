const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Transaction  = new mongoose.Schema({
    _id : Schema.Types.ObjectId,
    transactionId : {type : Schema.Types.String },
    sendAddress : {type : Schema.Types.String },
    receiveAddress : {type : Schema.Types.String },
    amount : {type : Schema.Types.String }
});


module.exports = mongoose.model("transactions",Transaction);