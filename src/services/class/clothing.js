'use strict'

const Product = require("./product")
const { clothing } = require("../../models/product.model")

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
}

module.exports = Clothing
