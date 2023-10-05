'use strict'

const { Types } = require('mongoose')
const keyTokenModel = require('../models/keytoken.model')

class KeyTokenService {

    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {

            const filter = { user: userId }
            const update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken }
            const options = { upsert: true, new: true }

            const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)
            
            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }

    static findByUserId = async (userId) => {
        return await keyTokenModel.findOne({ user: new Types.ObjectId(userId)})
    }

    static removeKeyById = async (userId) => {
        return await keyTokenModel.deleteOne(userId)
    }

    static findByRefreshTokenUsed = async (refreshToken) => {
        return await keyTokenModel.findOne({ refreshTokensUsed: refreshToken })
    }

    static findByRefreshToken = async (refreshToken) => {
        return await keyTokenModel.findOne({ refreshToken })
    }

    static deleteKeyById = async (userId) => {
        return await keyTokenModel.findOneAndRemove({ user: new Types.ObjectId(userId) })
    }

}

module.exports = KeyTokenService