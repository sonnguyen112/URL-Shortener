const express = require("express")
const router = express.Router()
const apiController = require("../controllers/apiController")

router.use("/shorturl/:id", apiController.search)

router.use("/shorturl", apiController.shorturl)
module.exports = router