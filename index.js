require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected')
})
const app = express()

const shopRoutes = require('./routes/shopRoutes')
const authRoutes = require('./routes/authRoutes')
app.use(express.json())
app.use('/api/shop', shopRoutes)
app.use('/api/auth', authRoutes)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
