'use strict'

const { Schema, model } = require('mongoose')
const { DOCUMENT_NAME, COLLECTIONS_NAME } = require('./init.name')

// Declare the Schema of the Mongo model
var keyTokenSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        required:true,
        ref: DOCUMENT_NAME.SHOP
    },
    privateKey:{
        type: String,
        required: true,
    },
    publicKey:{
        type:String,
        required:true,
    },
    refreshTokensUsed:{
        type:Array,
        default: []
    },
    refreshToken: {
        type: String,
        required: true
    }
},{
    collection: COLLECTIONS_NAME.KEY,
    timestamps: true,
});

//Export the model
module.exports = model(DOCUMENT_NAME.KEY, keyTokenSchema);