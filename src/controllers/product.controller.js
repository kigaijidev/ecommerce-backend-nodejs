'use strict'
const { CREATED, OK, SuccessResponse } = require('../core/success.response')
const ProductService = require('../services/product.service')

class ProductController {

    createProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Create new Product success!',
            metadata: await ProductService.createProduct(req.body.product_type, {
                ...req.body,
                product_shop: req.user.userId,
            })
        }).send(res)
    }

    updateProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update Product success!',
            metadata: await ProductService.updateProduct(req.body.product_type, req.params.productId, {
                ...req.body,
                product_shop: req.user.userId,
            })
        }).send(res)
    }

    // GET
    getAllDraftsForShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get list drafts success',
            metadata: await ProductService.findAllDraftsForShop({
                product_shop: req.user.userId
            })
        }).send(res)
    }

    getAllPublishForShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get list publish success',
            metadata: await ProductService.findAllPublishForShop({
                product_shop: req.user.userId,
            })
        }).send(res)
    }

    findAllProdcuts = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get all prodcut success',
            metadata: await ProductService.findAllProducts(req.query)
        }).send(res)
    }

    findProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get product search success',
            metadata: await ProductService.findProduct({
                product_id: req.params.productId
            })
        }).send(res)
    }

    // PATCH
    publishProductByShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'Publish product success',
            metadata: await ProductService.publishProductByShop({
                product_shop: req.user.userId,
                product_id: req.params.id
            })
        }).send(res)
    }

    unPublishProductByShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'Unpublish product success',
            metadata: await ProductService.unPublishProductByShop({
                product_shop: req.user.userId,
                product_id: req.params.id
            })
        }).send(res)
    }

    getListSearchProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get list search success',
            metadata: await ProductService.searchProducts(req.params)
        }).send(res)
    }
}

module.exports = new ProductController()
