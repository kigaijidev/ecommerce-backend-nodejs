'use strict'

const { Schema, model } = require('mongoose'); // Erase if already required
const { DOCUMENT_NAME, COLLECTIONS_NAME } = require('./init.name');
const slugify = require('slugify');

// Declare the Schema of the Mongo model
var productSchema = new Schema({
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_description: String,
    product_slug: String,
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_type: { type: String, required: true, enum: ['Electronics', 'Clothing', 'Furniture'] },
    product_shop: { type: Schema.Types.ObjectId, ref: DOCUMENT_NAME.SHOP, required: true },
    product_attributes: { type: Schema.Types.Mixed, required: true },
    product_ratingsAverage: {
        type: Number,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        default: 4.5,
        set: (val) => Math.round(val * 10) / 10
    },
    product_variations: { type: Array, default: []},
    isDraft: { type: Boolean, default: true, index: true, select: false },
    isPublish : { type: Boolean, default: false, index: true, select: false },
},{
    collection: COLLECTIONS_NAME.PRODUCT,
    timestamps: true,
});

productSchema.index({ product_name: 'text', product_description: 'text' })

productSchema.pre('save', function ( next ) {
    this.product_slug = slugify(this.product_name, { lower: true })
    next();
})

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
    brand: { type: String, required: true },
    size: String,
    material: String,
    product_shop: { type: Schema.Types.ObjectId, ref: DOCUMENT_NAME.SHOP }
}, {
    collection: COLLECTIONS_NAME.FURNITURES,
    timestamps: true,
})

//Export the model
module.exports = {
    product: model( DOCUMENT_NAME.PRODUCT, productSchema),
    clothing: model( DOCUMENT_NAME.CLOTHING, clothingSchema),
    electronic: model( DOCUMENT_NAME.ELECTRONIC, electronicSchema),
    furniture: model( DOCUMENT_NAME.FURNITURE, furnitureSchema),
};