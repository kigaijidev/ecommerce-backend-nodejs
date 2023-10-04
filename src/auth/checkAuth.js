'use strict'

const { ForbiddenRequestError } = require("../core/error.response")
const { findById } = require("../services/apikey.service")

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY].toString()
        if(!key){
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }

        const objKey = await findById(key)
        if(!objKey){
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }
        res.objKey = objKey
        return next()
    } catch (error) {
        
    }
}

const permission = ( permission ) => {
    return (req, res, next) => {
        if(!req.objKey.permission){
            throw new ForbiddenRequestError('Permission denied')
        }

        const validPermission = req.objKey.permission.includes(permission)
        if(!validPermission){
            throw new ForbiddenRequestError('Permission denied')
        }

        return next()
    }
}

const asyncHandler = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}

module.exports = {
    apiKey,
    permission,
    asyncHandler,
}