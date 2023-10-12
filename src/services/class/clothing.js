'use strict'

const Product = require("./product")
const { clothing } = require("../../models/product.model")
const { updateProductById } = require("../../models/repository/product.repo")
const { removeUnderfineObject, updateNestedObjectParser } = require("../../utils")

class Clothing extends Product {

    async createProduct(){

        const newClothing = await clothing.create({
            ...this.product_attributes,
            product_shop: this.product_shop,
        })
        if(!newClothing){
            throw new BadRequestError('create new Clothing error')
        }

        const newProduct = await super.createProduct(newClothing._id)
        if(!newProduct){
            throw new BadRequestError('create new Product error')
        }

        return newProduct;
    }

    async updateProduct( product_id ){
        
        const objectParams = removeUnderfineObject(this)

        if(objectParams.product_attributes){
            await updateProductById({ 
                product_shop: objectParams.product_shop,
                product_id, 
                bodyUpdate: updateNestedObjectParser(objectParams.product_attributes), 
                model: clothing 
            })
        }

        const updateProduct = await super.updateProduct(product_id, updateNestedObjectParser(objectParams))
        return updateProduct
    }
}

module.exports = Clothing
