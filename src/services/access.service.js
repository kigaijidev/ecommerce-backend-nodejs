'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require("./keyToken.service")
const { createTokenPair } = require('../auth/authUtils')
const { getInfoData } = require("../utils")
const { BadRequestError, ForbiddenRequestError, ConflictRequestError } = require("../core/error.response")

const RoleShop = {
    SHOP: 'SHOP',
    WRITE: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
}

class AccessService {

    static signUp = async ({ name, email, password }) => {

        const holderShop = await shopModel.findOne({ email }).lean()

        if(holderShop){
            throw new ConflictRequestError(`[Error] Shop already registered!`)
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const newShop = await shopModel.create({ name, email, password: passwordHash, roles: [RoleShop.SHOP] })

        if(!newShop){
            throw new ForbiddenRequestError('[Error] server error')         
        }

        const publicKey = crypto.randomBytes(64).toString('hex')
        const privateKey = crypto.randomBytes(64).toString('hex')

        const keyStore = await KeyTokenService.createToken({ 
            userId: newShop._id,
            publicKey,
            privateKey,
        })

        if(!keyStore){
            throw new BadRequestError(`[Error] KeyStore error!`)
        }

        const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey)

        return {
            shop: getInfoData({ fields: ['_id', 'name', 'email'], object: newShop}),
            tokens,
        }

    }
}

module.exports = AccessService
