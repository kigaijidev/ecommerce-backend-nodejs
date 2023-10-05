'use strict'

const { StatusCodes, ReasonPhrases } = require('../utils/httpStatusCode')

class SuccessResponse {

    constructor({ message = ReasonPhrases.OK, status = StatusCodes.OK, metadata = {}}){
        this.message = message,
        this.status = status,
        this.metadata = metadata
    }

    send(res, headers = {}){
        return res.status( this.status ).json(this)
    }
}

class OK extends SuccessResponse {
    
    constructor({ message, metadata }){
        super({message, metadata})
    }
}

class CREATED extends SuccessResponse {
    
    constructor({ message = ReasonPhrases.CREATED, status = StatusCodes.CREATED, metadata }){
        super({message, status, metadata})
    }
}

module.exports = {
    OK,
    CREATED,
    SuccessResponse,
}
