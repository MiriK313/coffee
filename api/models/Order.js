const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orderSchema = new Schema({
    name: {
        type: String
    },
    time: {
        type: Number
    },
}, {
    collection: 'orders'
})

module.exports = mongoose.model('Order', orderSchema);