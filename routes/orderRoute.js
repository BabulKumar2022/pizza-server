const  express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid')
const stripe = require('stripe')('sk_test_51N3LwID3DUasc0CjVIsJmI7RAlUfDJ7z5QK8R4zQ0MPQVAHNPeT7lQBomCVhjcELmht0VWvbu1Nn6BffMFUOZzS800HyPESzbl')
const Order =require('../models/orderModel') 




router.post('/placeOrder', async(req, res) =>{
    const {token, subTotal, currentUser,cartItems}=req.body
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const payment = await stripe.charges.create({
            amount: subTotal * 100,
            currency: 'BDT',
            customer: customer.id,
            receipt_email: token.email
        }, {idempotencyKey: uuidv4()})
        if(payment){
            const newOrder = new Order ({
            name: currentUser.name,
            email: currentUser.email,
            userId: currentUser._id,
            orderItems:cartItems,
            orderAmount: subTotal,
            shippingAddress:{
                street: token.card.address_line1,
                city: token.card.address_city,
                country: token.card.address_country,
                code:token.card.address_zip,
            },
            transactionId: payment.source.id
            })
            newOrder.save()
            res.send('Payment success')
        }else{
            res.send('Payment failed')
        }
    } catch (error) {
        res.status(400).json({
            message: 'Something went wrong',
            error: error.stack,
        })
    }
})

router.post('/getUserOrder', async(req, res)=>{
    const {userId}= req.body
    try {
        const orders = await Order.find({userId}).sort({_id: '-1'})
        res.status(200).send(orders)
    } catch (error) {
        res.status(400).json({
            message: 'Something went wrong',
            error: error.stack,
        })
       
    }
})















module.exports = router