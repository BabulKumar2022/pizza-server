const  express = require('express');
const router = express.Router();
const pizzaModel = require('../models/pizzaModel');

//get all pizza
router.get('/getAllPizzas', async(req, res) =>{
    try {
        const pizzas =await pizzaModel.find({})
        res.send(pizzas)
    } catch (error) {
        res.json({message:error})
    }
});
// add pizza
router.post('/addPizza', async(req, res) =>{
    const {pizza} =req.body
    try {
        const newPizza = new pizzaModel({
            name: pizza.name,
            image: pizza.image,
            variant: ['small', "medium", 'large'],
            description: pizza.description,
            category: pizza.category,
            prices: [pizza.prices]
        })
        await newPizza.save()
        res.status(201).send('new Pizza added')
    } catch (error) {
        res.json({message:error})
    }
});
module.exports = router;