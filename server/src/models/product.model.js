const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
		},
		hasDiscount: {
			type: Boolean,
			default: false
		},
		cost: {
			type: Number,
		}
	}
)

const Product = mongoose.model('products', productSchema)

module.exports = Product
