'use strict'

const { BadRequestError } = require('../core/error.response');
const { 
    findAllDraftsForShop, 
    findAllPublishForShop,
    publishProductByShop, 
    unPublishProductByShop,
    searchProductByUser,
    findAllProducts,
    findProduct,
} = require('../models/repository/product.repo');
const configProductType = require('./product.config')

class ProductFactory {

    static productRegistry = {};
    
    static RegisterProductType = () => {
        for(const [type, classRef] of Object.entries(configProductType)){
            ProductFactory.productRegistry[type] = classRef;
        }
    }

    static async createProduct( type, payload){
        const productClass = ProductFactory.productRegistry[type];
        if(!productClass){
            throw new BadRequestError(`Inavlid Product Type ${type}`)
        }

        return new productClass( payload).createProduct();
    }

    
    static async updateProduct({ keySearch }){
        return await searchProductByUser({ keySearch })
    }

    /**
     * @description Get all Product is draft for shop
     * @param {String} product_shop 
     * @param {Number} skip 
     * @param {Number} limit 
     * @returns { JSON }
     */
    static async findAllDraftsForShop({ product_shop, skip = 0, limit = 50 }){
        const query = { product_shop, isDraft: true }
        return await findAllDraftsForShop({ query, skip, limit })
    }
    
    static async findAllPublishForShop({ product_shop, skip = 0, limit = 50 }){
        const query = { product_shop, isPublish: true }
        return await findAllPublishForShop({ query, skip, limit })
    }

    static async publishProductByShop({ product_shop, product_id }){
        return await publishProductByShop({ product_shop, product_id })
    }

    static async unPublishProductByShop({ product_shop, product_id }){
        return await unPublishProductByShop({ product_shop, product_id })
    }

    static async searchProducts({ keySearch }){
        return await searchProductByUser({ keySearch })
    }

    static async findAllProducts({ page = 1, limit = 50, sort = 'ctime', filter = { isPublish: true } }){
        return await findAllProducts({ page, limit, sort, filter, 
            select: ['product_id', 'product_name', 'product_thumb', 'product_price'] 
        })
    }

    static async findProduct({ product_id }){
        return await findProduct({ product_id, unSelect: ['__v'] })
    }
}

// register product types
ProductFactory.RegisterProductType()

module.exports = ProductFactory
