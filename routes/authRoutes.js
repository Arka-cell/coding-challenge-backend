const express = require('express')

const jwt = require('jsonwebtoken')
const Cryptr = require('cryptr')

const router = express.Router()

const User = require('../model/userModel.js')

const cryptr = new Cryptr(process.env.PASSWORD_SECRET)

function generateAccessToken(id) {
    return jwt.sign({ user_id: id }, process.env.JWT_SECRET, { expiresIn: '1800s' })
}

router.post('/signup', async (req, res) => {
    const hashedPassword = cryptr.encrypt(req.body.password)

    console.log(hashedPassword)
    const data = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedData = await data.save()
        res.status(201).json({ name: savedData.name, email: savedData.email })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/login', async (req, res) => {
    const password = req.body.password
    const email = req.body.email
    const user = await User.findOne({ email }).exec()
    if (user) {
        const unhashedPassword = cryptr.decrypt(user.password)
        if (unhashedPassword === password) {
            const userJwt = generateAccessToken(user.id)
            res.json({ token: userJwt })
        } else {
            res.status(401).json({ message: 'Invalid email or password' })
        }
    } else {
        res.status(401).json({ message: 'Invalid email or password' })
    }
})

module.exports = router
