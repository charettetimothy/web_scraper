var app = require("express").Router()
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.nytimes.com/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data); //object
      var allArticles = []
      $(".css-1100km").each(function(i, element) {  
        // Save an empty result object        
        var result = {};
        result.headline = $(this)
          .find("h2")
          .text();
        result.summary = $(this)
          .find("li")
          .text();
        result.url = $(this)
          .find("a")
          .attr("href");
        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            // console.log(dbArticle);
          })
          .catch(function(err) {
            console.log(err);
          });
          allArticles.push(result)
      });
      res.send(allArticles); // Send allArticles to the client 
    });
  });

  module.exports = app