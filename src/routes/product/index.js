'use strict'

const express = require('express')
const productController = require('../../controllers/product.controller')
const asyncHandler = require('../../helper/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const router = express.Router()

router.get('', asyncHandler(productController.findAllProdcuts))
router.get('/:productId', asyncHandler(productController.findProduct))
router.get('/search/:keySearch', asyncHandler(productController.getListSearchProduct))

router.use(authentication)

router.post('', asyncHandler(productController.createProduct))
router.patch('/:productId', asyncHandler(productController.updateProduct))

router.patch('/unpublish/:id', asyncHandler(productController.unPublishProductByShop))
router.patch('/publish/:id', asyncHandler(productController.publishProductByShop))

// QUERY
router.get('/drafts/all', asyncHandler(productController.getAllDraftsForShop))
router.get('/publish/all', asyncHandler(productController.getAllPublishForShop))


module.exports = router
