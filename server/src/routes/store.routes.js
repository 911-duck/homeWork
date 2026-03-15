const express = require('express')
const router = express.Router()
const StoreController = require('../controllers/store.controller')

router.get('/', StoreController.getProducts)
router.post('/', StoreController.postProduct)
router.delete('/:id', StoreController.deleteProduct)
router.patch('/:id', StoreController.patchProduct)

module.exports = router
