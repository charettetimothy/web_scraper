var app = require("express").Router()
app.get("/", function(req, res) {
    res.render("home")
})
module.exports = app