const mongoose = require('mongoose')


const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'order name required']
    },
    email:{
        type: String,
        required: [true, 'order email required']
    },
    userId:{
        type: String,

    },
    orderItems: [],
    shippingAddress:{
        type: Object,

    },
    orderAmount:{
       type: String, 
    },
    isDelivered:{
        type: String,

    },
    transactionId:{
        type: String,

    }
},{timestamps: true})


module.exports = mongoose.model('Order', orderSchema)