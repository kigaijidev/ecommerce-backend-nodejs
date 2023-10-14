'use strict'

const { BadRequestError, NotFoundError } = require('../core/error.response')
const { discount } = require('../models/discount.model')
const { findAllDiscountCodesUnSelect, checkDiscountExists, findAllDiscountCodesSelect } = require('../models/repository/discount.repo')
const { findAllProducts } = require('../models/repository/product.repo')
const { convertToObjectIdMongodb } = require('../utils')

//TODO: apply Builder Pattern
class DiscountService {
    
    static async createDiscountCode (body){
        const { 
            name, discription, code, start_date, end_date, is_active, shopId, value, users_used,
            min_order_value, product_ids, applies_to, max_uses, uses_count, max_uses_per_user, type
        } = body

        if(new Date() > new Date(end_date)){
            throw new BadRequestError('Discount code has expried')
        }

        if(new Date(start_date) >= new Date(end_date)){
            throw new BadRequestError('Start date must be before nd_date')
        }

        const foundDiscount = await discount.findOne({
            discount_code: code,
            discount_shopId: convertToObjectIdMongodb(shopId)
        }).lean()

        if(foundDiscount && foundDiscount.discount_is_active){
            throw new BadRequestError('Discount exists!')
        }

        const newDiscount = await discount.create({
            discount_name: name,
            discount_description: discription,
            discount_type: type,
            discount_value: value,
            discount_code: code,
            discount_start_date: new Date(start_date),
            discount_end_date: new Date(end_date),
            discount_max_uses: max_uses,
            discount_uses_count: uses_count,
            discount_users_used: users_used,
            discount_max_uses_per_user: max_uses_per_user,
            discount_min_order_value: min_order_value || 0,
            discount_shopId: shopId,
            discount_is_active: is_active,
            discount_applies_to: applies_to,
            discount_product_ids: applies_to === 'all' ? [] : product_ids,
        })

        return newDiscount
    }

    static async updateDiscount (){
        return []
    }

    static async getAllDiscountCodesWithProduct({ code, shopId, userId, limit, page}){
        
        const foundDiscount = await discount.findOne({
            discount_code: code,
            discount_shopId: convertToObjectIdMongodb(shopId)
        }).lean()

        if(!foundDiscount || !foundDiscount.discount_is_active){
            throw new NotFoundError('Discount not exists!')
        }

        const { discount_applies_to, discount_product_ids } = foundDiscount
        let products
        if(discount_applies_to === 'all'){

            products = await findAllProducts({
                filter: {
                    product_shop: convertToObjectIdMongodb(shopId),
                    isPublish: true
                },
                limit: +limit,
                page: +page,
                sort: 'ctime',
                select: ['product_name']
            })
        }

        if(discount_applies_to === 'specific'){

            products = await findAllProducts({
                filter: {
                    _id: { $in: discount_product_ids },
                    isPublish: true
                },
                limit: +limit,
                page: +page,
                sort: 'ctime',
                select: ['product_name']
            })
        }
        
        return products 
    }

    static async getAllDiscountCodeByShop({ limit, page, shopId }){
        const discounts = await findAllDiscountCodesSelect({
            limit: +limit,
            page: +page,
            filter: { 
                discount_shopId: convertToObjectIdMongodb(shopId),
                discount_is_active: true, 
            },
            select: ['discount_code', 'discount_name', 'discount_is_active']
        })

        return discounts
    }

    static async getDiscountAmount({ code, userId, shopId, products }){

        const foundDiscount = await checkDiscountExists({
            discount_code: code,
            discount_shopId: convertToObjectIdMongodb(shopId)
        })

        if(!foundDiscount){
            throw new NotFoundError('Discount not exists')
        }

        const { 
            discount_is_active,
            discount_max_uses,
            discount_end_date,
            discount_start_date,
            discount_min_order_value,
            discount_max_uses_per_user,
            discount_users_used,
            discount_value,
            discount_type
        } = foundDiscount

        if(!discount_is_active){ throw new NotFoundError('Discount expried') }
        if(!discount_max_uses){ throw new NotFoundError('Discount are out') }

        if(new Date() < new Date(discount_start_date) || new Date() > new Date(discount_end_date)){
            throw new NotFoundError('Discount code has expried')
        }

        let totalOrder = 0
        if(discount_min_order_value > 0){
            totalOrder = products.reduce(( acc, product ) => {
                return acc = (product.quantity * product.price)
            }, 0)

            if(totalOrder < discount_min_order_value){
                throw new NotFoundError(`Discount requires a min order value of ${discount_min_order_value}`)
            }
        }

        if(discount_max_uses_per_user > 0){
            const userUsedDiscount = discount_users_used.find( user => user.userId === userId)
            if(userUsedDiscount){
                //TODO: check
            }
        }

        const amount = discount_type === 'fixed_amount' ? discount_value : (totalOrder * discount_value) / 100
        return {
            totalOrder,
            discount: amount,
            totalPrice: totalOrder - amount,
        }
    }

    static async deleteDiscountCode({ shopId, code }){
        const deleted = await discount.findOneAndDelete({
            discount_code: code,
            discount_shopId: convertToObjectIdMongodb(shopId)
        })

        return deleted 
    }

    static async cancelDiscountCode({ codeId, shopId, userId }){
        const foundDiscount = await checkDiscountExists({
            discount_code: codeId,
            discount_shopId: convertToObjectIdMongodb(shopId)
        })

        if(!foundDiscount) throw new NotFoundError('Discount not exists')

        const result = await discount.findByIdAndUpdate( foundDiscount._id, {
            $pull: {
                discount_users_used: userId
            },
            $inc:{
                discount_max_uses: 1,
                discount_uses_count: -1
            }
        })

        return result
    }
}

module.exports = DiscountService
