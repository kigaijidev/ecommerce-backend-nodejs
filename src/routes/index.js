'use strict'

const express = require('express')
const { apiKey } = require('../auth/checkAuth')
const router = express.Router()

// check apiKey
router.use(apiKey)
// check permission

router.use('/v1/api', require('./access'))
// router.use('/', ( req, res, next) => {
//     return res.status(200).send('Hello NodeJs')
// })

module.exports = router
