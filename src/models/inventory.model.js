'use strict'

const { Schema, model } = require('mongoose')
const { DOCUMENT_NAME, COLLECTIONS_NAME } = require('./init.name')

// Declare the Schema of the Mongo model
var inventorySchema = new Schema({
    inven_productId:{ type: Schema.Types.ObjectId, required:true, ref: DOCUMENT_NAME.PRODUCT },
    inven_location:{ type: String, default: 'unknown' },
    inven_stock:{ type:Number, required:true },
    inven_shopId:{ type: Schema.Types.ObjectId, required:true, ref: DOCUMENT_NAME.SHOP },
    inven_reservations:{ type:Array, default: [] },
},{
    collection: COLLECTIONS_NAME.INVENTORY,
    timestamps: true,
});

//Export the model
module.exports = {
    inventory: model(DOCUMENT_NAME.INVENTORY, inventorySchema)
};