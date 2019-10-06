const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var transactionSchema = new Schema({
    sender: {type:  Schema.Types.ObjectId, required: true},
    reciever: {type: Schema.Types.ObjectId, required: true},
    description: {type: String},
    amount: {type: Number, required: true}
}, {
    timestamps: true
});

const Transaction = mongoose.model('Transaction',transactionSchema);

module.exports = Transaction;