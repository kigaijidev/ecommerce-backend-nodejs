'use strict'

const { StatusCodes, ReasonPhrases } = require('../utils/httpStatusCode')
const statusCodes = require('../utils/statusCodes')

class ErrorResponse extends Error {

    constructor(message, status){
        super(message)
        this.status = status
    }
}

class ConflictRequestError extends ErrorResponse {

    constructor(message = ReasonPhrases.CONFLICT, status = StatusCodes.CONFLICT ){
        super(message, status)
    }
}

class ForbiddenError extends ErrorResponse {
    
    constructor(message = ReasonPhrases.FORBIDDEN, status = StatusCodes.FORBIDDEN ){
        super(message, status)
    }
}

class BadRequestError extends ErrorResponse {
    
    constructor(message = ReasonPhrases.BAD_REQUEST, status = StatusCodes.BAD_REQUEST ){
        super(message, status)
    }
}

class AuthFailError extends ErrorResponse {

    constructor(message = ReasonPhrases.UNAUTHORIZED, status = statusCodes.UNAUTHORIZED){
        super(message, status)
    }
}

class NotFoundError extends ErrorResponse {

    constructor(message = ReasonPhrases.NOT_FOUND, status = statusCodes.NOT_FOUND){
        super(message, status)
    }
}

module.exports = {
    ConflictRequestError,
    ForbiddenError,
    BadRequestError,
    AuthFailError,
    NotFoundError,
}
