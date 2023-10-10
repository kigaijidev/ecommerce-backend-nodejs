'use strict'

const express = require('express')
const productController = require('../../controllers/product.controller')
const asyncHandler = require('../../helper/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const router = express.Router()

router.get('', asyncHandler(productController.findAllProdcuts))
router.get('/:product_id', asyncHandler(productController.findProduct))
router.get('/search/:keySearch', asyncHandler(productController.getListSearchProduct))

router.use(authentication)

router.post('/create', asyncHandler(productController.createProduct))

router.patch('/unpublish/:id', asyncHandler(productController.unPublishProductByShop))
router.patch('/publish/:id', asyncHandler(productController.publishProductByShop))

// QUERY
router.get('/drafts/all', asyncHandler(productController.getAllDraftsForShop))
router.get('/publish/all', asyncHandler(productController.getAllPublishForShop))


module.exports = router
