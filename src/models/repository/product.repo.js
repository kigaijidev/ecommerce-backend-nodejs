'use strict'

const { Types } = require("mongoose")
const { product, clothing, electronic, furniture } = require("../product.model")
const { getSelectData, unGetSelectData } = require("../../utils")

const findAllDraftsForShop = async ({ query, skip, limit }) => {
    return await queryProduct({ query, skip, limit })
}

const findAllPublishForShop = async ({ query, skip, limit }) => {
    return await queryProduct({ query, skip, limit })
}

const queryProduct = async ({ query, skip, limit }) => {
    return await product.find(query)
    .populate('product_shop', 'name email -_id')
    .sort({ updateAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec()
}

const publishProductByShop = async ({ product_shop, product_id }) => {
    const foundProduct = await product.findOne({
        product_shop: new Types.ObjectId(product_shop),
        _id: new Types.ObjectId(product_id)
    })

    if(!foundProduct){
        return null
    }

    foundProduct.isDraft = false
    foundProduct.isPublish = true

    const { modifiedCount } = await foundProduct.updateOne(foundProduct)

    return modifiedCount
}

const unPublishProductByShop = async ({ product_shop, product_id }) => {
    const foundProduct = await product.findOne({
        product_shop: new Types.ObjectId(product_shop),
        _id: new Types.ObjectId(product_id)
    })

    if(!foundProduct){
        return null
    }

    foundProduct.isDraft = true
    foundProduct.isPublish = false

    const { modifiedCount } = await foundProduct.updateOne(foundProduct)

    return modifiedCount
}

const searchProductByUser = async ({ keySearch }) => {
    const regexSearch = RegExp(keySearch)
    const results = await product.find({
        isPublish: true,
        $text: { $search: regexSearch }
    }, { score: { $meta: 'textScore' }})
    .sort({ score: { $meta: 'textScore' }})
    .lean()

    return results
}

const findAllProducts = async ({ page, limit, sort, filter, select }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1} : { _id: 1};
    const products = await product.find( filter )
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(getSelectData(select))
    .lean()
    
    return products;
}

const findProduct = async ({ product_id, unSelect }) => {
    return await product.findById(product_id).select(unGetSelectData(unSelect)).lean()
}

const updateProductById = async ({ product_shop, product_id, bodyUpdate, model, isNew = true }) => {
    return await model.findOneAndUpdate({ product_shop, _id: product_id }, bodyUpdate, { new: isNew })
}

module.exports = {
    findAllDraftsForShop,
    findAllPublishForShop,
    publishProductByShop,
    unPublishProductByShop,
    searchProductByUser,
    findAllProducts,
    findProduct,
    updateProductById,
}
