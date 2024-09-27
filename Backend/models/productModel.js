const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    image: {
        type: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    description: {
        type: String,
    },
    stock: {
        type: Number,
        default: 0,
    },
    discountPercentage: {
        type: Number,
        default: 0, // Set default value to 0 if no discount is applied
    },
});

// Mongoose virtual for discountPrice
productSchema.virtual('discountPrice').get(function () {
    // If discountPercentage is not defined or is 0, return the original price
    if (!this.discountPercentage || this.discountPercentage === 0) {
        return this.price;
    }
    // Calculate discount price if discountPercentage is defined
    return this.price - (this.price * this.discountPercentage / 100);
});

productSchema.set('toJSON', { virtuals: true });
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
