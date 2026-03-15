const StoreService = require('../services/store.service')

class StoreController {
	async getProducts(req, res) {
		try {
			const param = req.query.hasDiscount
			let result
			if(param) result = await StoreService.getProducts({hD : param == "true"})
			else result = await StoreService.getProducts()
			if (!result.success) return res.status(400).json(result)
			res.status(200).json(result)
		} catch (error) {
			return res.status(500).json({ success: false, error: 'Server error' })
		}
	}
	async postProduct(req, res) {
		try {
			const result = await StoreService.postProducts(req.body)
			if (!result.success) return res.status(400).json(result)
			res.status(200).json(result)
		} catch (error) {
			return res.status(500).json({ success: false, error: 'Server error' })
		}
	}
	async deleteProduct(req, res) {
		try {
			const result = await StoreService.deleteProducts(req.params.id)
			if (!result.success) return res.status(400).json(result)
			res.status(200).json(result)
		} catch (error) {
			return res.status(500).json({ success: false, error: 'Server error' })
		}
	}
	async patchProduct(req, res) {
		try {
			const result = await StoreService.patchProducts(req.params.id,req.body)
			if (!result.success) return res.status(400).json(result)
			res.status(200).json(result)
		} catch (error) {
			return res.status(500).json({ success: false, error: 'Server error' })
		}
	}
}

module.exports = new StoreController()
