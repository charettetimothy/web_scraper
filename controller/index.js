var app = require("express").Router()
var apiRoutes = require("./apiRoutes")
var htmlRoutes = require("./htmlRoutes")
app.use("/api", apiRoutes)
app.use("/", htmlRoutes)
module.exports = app