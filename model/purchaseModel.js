const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    }
})
purchaseSchema.set('timestamps', true)

module.exports = mongoose.model('Purchase', purchaseSchema)
