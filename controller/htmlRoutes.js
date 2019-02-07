var app = require("express").Router()
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

app.get("/", function(req, res) {
    db.Article.find({}).then(function (data) {
        res.render("home", {article: data})
    })
})

app.post("/api/update/:id", function(req, res) {
    db.Article.findByIdAndUpdate({_id: req.params.id}, {saved: true})
    .then(function (data) {
        res.render("home", {article: data})
    })
})

app.get("/saved", function(req, res) {
    db.Article.find({}).then(function (data) {
        res.render("saved", {article: data})
    })
})
module.exports = app