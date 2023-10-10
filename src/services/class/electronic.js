'use strict'

const Product = require("./product")
const { electronic } = require("../../models/product.model")

class Electronic extends Product {

    async createProduct(){

        const newElectronic = await electronic.create({
            ...this.product_attributes,
            product_shop: this.product_shop,
        })
        if(!newElectronic){
            throw new BadRequestError('create new Electronic error')
        }

        const newProduct = await super.createProduct(newElectronic._id)
        if(!newProduct){
            throw new BadRequestError('create new Product error')
        }

        return newProduct;
    }
}

module.exports = Electronic
