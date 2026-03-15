const Product = require('../models/product.model')

class StoreService {
	async getProducts(obj) {
		try {
			let products
			if(obj) products = await Product.find({ hasDiscount : obj.hD})
			else products = await Product.find()
			return { success: true, data: products }
		} catch (error) {
			return { success: false, error: error.message }
		}
	}
	async postProducts(obj) {
		try {
			const products = await Product.create(obj)
			return { success: true, data: products }
		} catch (error) {
			return { success: false, error: error.message }
		}
	}
	async deleteProducts(id){
		try {
			const products = await Product.findByIdAndDelete(id)
			return { success: true, data: products }
		} catch (error) {
			return { success: false, error: error.message }
		}
	}
	async patchProducts(id,obj){
		try {
			const products = await Product.findByIdAndUpdate(id,obj)
			return { success: true, data: products }
		} catch (error) {
			return { success: false, error: error.message }
		}
	}
}

module.exports = new StoreService()
