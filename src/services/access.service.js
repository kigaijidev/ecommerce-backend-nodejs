'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require("./keyToken.service")
const { createTokenPair, verifyJWT } = require('../auth/authUtils')
const { getInfoData } = require("../utils")
const { BadRequestError, ConflictRequestError, AuthFailError, ForbiddenError } = require("../core/error.response")
const { findByEmail } = require("./shop.service")

const RoleShop = {
    SHOP: 'SHOP',
    WRITE: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
}

class AccessService {

    static handlerRefreshToken = async ({ refreshToken, user, keyStore }) => {

        const { userId, email } = user;
        if(keyStore.refreshTokensUsed.includes(refreshToken)){
            await KeyTokenService.deleteKeyById(userId)
            throw new ForbiddenError('Something wrong happend! Please relogin')
        }

        if(keyStore.refreshToken !== refreshToken){
            throw new AuthFailError('Shop not registered')
        }

        const foundShop = await findByEmail({email})
        if(!foundShop){
            throw new AuthFailError('Shop not registerd')
        }

        const tokens = await createTokenPair({ userId, email}, keyStore.publicKey, keyStore.privateKey)
        await keyStore.updateOne({
            $set:{
                refreshToken: tokens.refreshToken,
            },
            $addToSet: {
                refreshTokensUsed: refreshToken
            }
        })

        return {
            user: { userId, email },
            tokens
        }
    }

    static login = async ({ email, password, refreshToken = null  }) => {
        const foundShop = await findByEmail({ email })
        if(!foundShop){
            throw new BadRequestError('Shop not registered')
        }

        const match = bcrypt.compare( password, foundShop.password )
        if(!match){
            throw new AuthFailError('Authentication error')
        }

        const publicKey = crypto.randomBytes(64).toString('hex')
        const privateKey = crypto.randomBytes(64).toString('hex')

        const tokens = await createTokenPair({ userId: foundShop._id, email }, publicKey, privateKey)

        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            publicKey,
            privateKey,
            userId: foundShop._id
        })

        return {
            shop: getInfoData({ fields: ['_id', 'name', 'email'], object: foundShop }),
            tokens
        }
    }

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

        const keyStore = await KeyTokenService.createKeyToken({ 
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

    static logout = async ( keyStore ) => {
        const delKey = await KeyTokenService.removeKeyById(keyStore._id)
        return delKey
    }
}

module.exports = AccessService
