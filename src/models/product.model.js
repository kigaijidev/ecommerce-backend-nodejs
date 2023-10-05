'use strict'

const { Schema, model } = require('mongoose'); // Erase if already required
const { DOCUMENT_NAME, COLLECTIONS_NAME } = require('./init.name');

// Declare the Schema of the Mongo model
var productSchema = new Schema({
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_description: { type: String, required: true },
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_type: { type: String, required: true, enum: ['Electronics', 'Clothing', 'Furniture'] },
    product_shop: { type: Schema.Types.ObjectId, ref: DOCUMENT_NAME.SHOP, required: true },
    product_attributes: { type: Schema.Types.Mixed, required: true },
},{
    collection: COLLECTIONS_NAME.PRODUCT,
    timestamps: true,
});

const clothingSchema = new Schema({
    brand: { type: String, required: true },
    size: String,
    material: String,
    product_shop: { type: Schema.Types.ObjectId, ref: DOCUMENT_NAME.SHOP }
}, {
    collection: COLLECTIONS_NAME.CLOTHES,
    timestamps: true,
})

const electronicSchema = new Schema({
    manufacturer: { type: String, required: true },
    model: String,
    color: String,
    product_shop: { type: Schema.Types.ObjectId, ref: DOCUMENT_NAME.SHOP }
}, {
    collection: COLLECTIONS_NAME.CLOTHES,
    timestamps: true,
})

const furnitureSchema = new Schema({
    manufacturer: { type: String, required: true },
    model: String,
    color: String,
    product_shop: { type: Schema.Types.ObjectId, ref: DOCUMENT_NAME.SHOP }
}, {
    collection: COLLECTIONS_NAME.CLOTHES,
    timestamps: true,
})

//Export the model
module.exports = {
    product: model( DOCUMENT_NAME.PRODUCT, productSchema),
    clothing: model( DOCUMENT_NAME.CLOTHING, clothingSchema),
    electronic: model( DOCUMENT_NAME.ELECTRONIC, electronicSchema),
};