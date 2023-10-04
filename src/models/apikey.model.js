'use strict'

const { Schema, model } = require('mongoose'); // Erase if already required
const { COLLECTIONS_NAME, DOCUMENT_NAME } = require('./init.name');

// Declare the Schema of the Mongo model
var apiKeySchema = new Schema({
    key:{
        type: String,
        required: true,
        unique: true,
    },
    status:{
        type: Boolean,
        default: true,
    },
    permission:{
        type: [String],
        required: true,
        enum: ['0000', '1111', '2222'],
    },
},{
    timestamps: true,
    collection: COLLECTIONS_NAME.API
});

//Export the model
module.exports = model(DOCUMENT_NAME.API, apiKeySchema);