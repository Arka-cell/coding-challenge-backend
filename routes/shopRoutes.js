const express = require('express')
const jwt = require('jsonwebtoken')
const Cryptr = require('cryptr')

const User = require('../model/userModel.js')
const Product = require('../model/productModel.js')
const Purchase = require('../model/purchaseModel.js')

const cryptr = new Cryptr(process.env.PASSWORD_SECRET)
const jwtSecret = process.env.JWT_SECRET

const router = express.Router()

router.use(async (req, res, next) => {
    console.log('Time:', Date.now())
    let token = null
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1]
    } else {
        res.status(403).json({ message: 'Unauthorized' })
        //  next()
    }
    if (token) {
        try {
            const decoded = jwt.verify(token, jwtSecret)
            if (!decoded) {
                res.status(403).json({ message: 'Session has expired' })
            } else {
                res.locals.user_id = decoded.user_id
                next()
            }
        } catch (err) {
            res.status(403).json({ message: 'Unauthorized' })
        }
    }
})

router.get('/me', async (req, res) => {
    const user = await User.findById(res.locals.user_id).exec()
    res.json({ name: user.name, email: user.email })
})

router.put('/me', async (req, res) => {
    const userId = res.locals.user_id
    const password = req.body.password
    const options = { new: true }
    if (password) {
        const hashedPassword = cryptr.encrypt(password)
        const result = await User.findByIdAndUpdate(
            userId, { password: hashedPassword }, options
        )
        res.send(result)
    }
    const data = { name: req.body.name }
    const result = await User.findByIdAndUpdate(
        userId, data, options
    )
    res.json({ name: result.name, id: result.id, email: result.email })
})

router.post('/products', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        availability: req.body.availability,
        owner_id: res.locals.user_id
    })
    try {
        const savedProduct = await product.save()
        res.status(201).json(savedProduct)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/products', async (req, res) => {
    try {
        const nameSearch = req.query.name
        const categorySearch = req.query.category
        const availabilitySearch = req.query.availability
        let data = null
        if (nameSearch) {
            const searches = {}
            if (categorySearch) {
                searches.category = { $regex: categorySearch }
            }
            if (nameSearch) {
                searches.name = { $regex: nameSearch }
            }
            if (availabilitySearch) {
                searches.availibility = { $regex: availabilitySearch }
            }
            data = await Product.find(searches)
        }
        if (!req.query.offset || !req.query.page) {
            if (!data) {
                data = await Product.find()
                res.json(data)
            }
            res.json(data)
        }
        const offset = req.query.offset
        const page = req.query.page
        if (offset * page <= data.length - offset) {
            const start = (offset * page) - offset
            const end = (offset * page)
            const result = data.slice(start, end)
            res.json(result)
        } else if (data.length <= offset) {
            res.json(data)
        } else {
            const start = (offset * page)
            const end = data.length
            const result = data.slice(start, end)
            res.json(result)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/products/:id', async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        res.json(product)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.post('/purchases', async (req, res) => {
    const productId = req.body.product_id
    const quantity = req.body.quantity
    const userId = res.locals.user_id
    const product = await Product.findById(productId)
    const price = product.price * quantity
    const purchase = new Purchase({
        product_id: product.id,
        total_price: price,
        quantity,
        user_id: userId
    })
    try {
        const savedPurchase = await purchase.save()
        res.status(201).json(savedPurchase)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/purchases', async (req, res) => {
    try {
        const userId = res.locals.user_id
        const data = await Purchase.find({ user_id: userId })
        if (!req.query.offset || !req.query.page) {
            res.json({ message: 'Please provide page and offset query parameters' })
        } else {
            const offset = req.query.offset
            const page = req.query.page
            if (offset * page <= data.length - offset) {
                const start = (offset * page) - offset
                const end = (offset * page)
                const result = data.slice(start, end)
                res.json(result)
            } else if (data.length <= offset) {
                res.json(data)
            } else {
                const start = (offset * page)
                const end = data.length
                const result = data.slice(start, end)
                res.json(result)
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/* router.get('/purchases/:id', async (req, res) => {
    try {
        const id = req.params.id
        const purchase = await Purchase.findById(id)
        if (purchase.user_id != res.locals.user_id) {
            res.json({ "message": "Purchase not found" })
        }
        res.json(purchase)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}) */

router.get('/purchases/stats', async (req, res) => {
    try {
        const totalPurchases = await Purchase.count().exec()
        const productPurchases = await Purchase.aggregate([
            { $group: { _id: '$product_id', count: { $count: {} } } }
        ])
        // const trends = await Purchase.find()
        console.log(totalPurchases)
        console.log(productPurchases)
        res.json({ total_purchases: totalPurchases, product_purchases: productPurchases, top_products: productPurchases.slice(0, 10) })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router
