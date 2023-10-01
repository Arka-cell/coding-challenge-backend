const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: Number
    },
    availability: {
        type: Boolean
    },
    owner_id: {
        type: String,
        required: true
    }
})

productSchema.set('timestamps', true)

module.exports = mongoose.model('Product', productSchema)
