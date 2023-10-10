'use strict'

const Product = require("./product")
const { furniture } = require("../../models/product.model")

class Furniture extends Product {

    async createProduct(){

        const newFurniture = await furniture.create({
            ...this.product_attributes,
            product_shop: this.product_shop,
        })
        if(!newFurniture){
            throw new BadRequestError('create new Furniture error')
        }

        const newProduct = await super.createProduct(newFurniture._id)
        if(!newProduct){
            throw new BadRequestError('create new Product error')
        }

        return newProduct;
    }
}

module.exports = Furniture
