'use strict'

const { Schema, model } = require('mongoose')
const { DOCUMENT_NAME, COLLECTIONS_NAME } = require('./init.name')

// Declare the Schema of the Mongo model
var discountSchema = new Schema({
    discount_name:{ type: String, required: true },
    discount_description:{ type: String, required: true},
    discount_type:{ type: String, default: 'fixed_amount'},
    discount_value:{ type: Number, required: true},
    discount_code:{ type: String, required: true},
    discount_start_date:{ type: Date, required: true},
    discount_end_date:{ type: Date, required: true},
    discount_max_uses:{ type: Number, required: true},
    discount_uses_count:{ type: Number, required: true},
    discount_users_used:{ type: Array, default: []},
    discount_max_uses_per_user:{ type: Number, required: true},
    discount_min_order_value:{ type: Number, required: true},
    discount_shopId:{ type: Schema.Types.ObjectId, ref: DOCUMENT_NAME.SHOP},
    discount_is_active:{ type: Boolean, default: true},
    discount_applies_to:{ type: String, required: true, enum: ['all','specific']},
    discount_product_ids:{ type: Array, default: []}
},{
    collection: COLLECTIONS_NAME.DISCOUNT,
    timestamps: true,
});

//Export the model
module.exports = {
    discount: model(DOCUMENT_NAME.DISCOUNT, discountSchema)
};