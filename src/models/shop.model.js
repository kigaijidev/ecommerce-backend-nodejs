'use strict'
const { model, Schema, Types } = require('mongoose'); // Erase if already required
const { DOCUMENT_NAME, COLLECTIONS_NAME } = require('./init.name')

// Declare the Schema of the Mongo model
var shopSchema = new Schema({
    name:{
        type:String,
        trim:true,
        maxLength:150,
    },
    email:{
        type:String,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default: 'inactive',
    },
    verify:{
        type: Schema.Types.Boolean,
        default: false,
    },
    roles:{
        type: Array,
        default:[],
    }
}, {
    timestamps: true,
    collection: COLLECTIONS_NAME.SHOP,
});

//Export the model
module.exports = model( DOCUMENT_NAME.SHOP, shopSchema);