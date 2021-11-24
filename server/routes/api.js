const router = require('express').Router()
const apiController = require("../controllers/api.controller")

router.post('/', apiController.check)

module.exports = router
