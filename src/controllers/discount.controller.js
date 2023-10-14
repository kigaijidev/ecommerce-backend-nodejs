'use strict'
const { CREATED, OK, SuccessResponse } = require('../core/success.response')
const DiscountService = require('../services/discount.service')

class DiscountController {

    createDiscount = async (req, res, next) => {
        new SuccessResponse({
            message: 'Create new Discount success!',
            metadata: await DiscountService.createDiscountCode({
                ...req.body,
                shopId: req.user.userId,
            })
        }).send(res)
    }

    getAllDiscountCodes = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get all discount success!',
            metadata: await DiscountService.getAllDiscountCodeByShop({
                ...req.body,
                shopId: req.user.userId,
            })
        }).send(res)
    }
    
    getDiscountAmount = async (req, res, next) => {
        new SuccessResponse({
            message: 'Successful code found!',
            metadata: await DiscountService.getDiscountAmount({
                ...req.body
            })
        }).send(res)
    }

    getAllDiscountCodeWithProducts = async (req, res, next) => {
        new SuccessResponse({
            message: 'Successful code found!',
            metadata: await DiscountService.getAllDiscountCodesWithProduct({
                ...req.query
            })
        }).send(res)
    }

}

module.exports = new DiscountController()
