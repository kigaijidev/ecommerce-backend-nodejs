'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const asyncHandler = require('../../helper/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const router = express.Router()

router.post('/auth/signup', asyncHandler(accessController.signUp))
router.post('/auth/login', asyncHandler(accessController.login))

router.use(authentication)

router.post('/auth/handler-refresh', asyncHandler(accessController.handlerRefreshToken))
router.post('/auth/logout', asyncHandler(accessController.logout))

module.exports = router
