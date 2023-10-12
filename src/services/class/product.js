'use strict'
const { product } = require("../../models/product.model")
const { insertInventory } = require("../../models/repository/inventory.repo")
const { updateProductById } = require("../../models/repository/product.repo")

class Product {
    constructor({
        product_name, product_thumb, product_description, product_price,
        product_quantity, product_type, product_shop, product_attributes
    }){
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_description = product_description
        this.product_price = product_price
        this.product_quantity = product_quantity
        this.product_type = product_type
        this.product_shop = product_shop
        this.product_attributes = product_attributes
    }

    async createProduct( product_id ){
        const newProduct = await product.create({ ...this, _id: product_id })
        if(newProduct){
            await insertInventory({
                productId: newProduct._id,
                shopId: this.product_shop,
                stock: this.product_quantity
            })
        }

        return newProduct
    }

    async updateProduct( product_id, bodyUpdate ){
        return await updateProductById({ product_shop: bodyUpdate.product_shop, product_id, bodyUpdate, model: product })
    }
}

module.exports = Product
