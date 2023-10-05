'use strict'
const JWT = require('jsonwebtoken')
const asyncHandler = require('../helper/asyncHandler')
const { AuthFailError, NotFoundError } = require('../core/error.response')
const { findByUserId } = require('../services/keyToken.service')

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization',
}

const createTokenPair = async ( payload, publicKey, privateKey ) => {
    try {
        const accessToken = await JWT.sign( payload, publicKey, {
            expiresIn: '2 days',
        })

        const refreshToken = await JWT.sign( payload, privateKey, {
            expiresIn: '7 days',
        })

        JWT.verify( accessToken, publicKey, ( err, decode ) => {
            if(err){
                console.error('error verify::', err)
            }else{
                console.error('decode verify::', decode)
            }
        })

        return { accessToken, refreshToken }
    } catch (error) {
        console.log(error)
    }
}

const authentication = asyncHandler( async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID]
    if(!userId){
        throw new AuthFailError('Invalid Request')
    }

    const keyStore = await findByUserId(userId)
    if(!keyStore){
        throw new NotFoundError('Not Found key store')
    }

    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken){
        throw new AuthFailError('Invalid Request')
    }

    try {
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey)
        if(userId !== decodeUser.userId){
            throw new AuthFailError('Invalid User')
        }
        req.keyStore = keyStore
        return next()
    } catch (error) {
        throw error
    }
})

module.exports = {
    createTokenPair,
    authentication,
}