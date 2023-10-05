'use strict'

const express = require('express')
const productController = require('../../controllers/product.controller')
const asyncHandler = require('../../helper/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const router = express.Router()

router.use(authentication)

router.post('/product/create', asyncHandler(productController.createProduct))

module.exports = router
