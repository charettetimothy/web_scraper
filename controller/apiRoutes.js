var app = require("express").Router()
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");


app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.nytimes.com/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
  // object^
      // console.log(response.data)
      var prettyElement = []
      // Now, we grab every h2 within an article tag, and do the following:
      $(".css-1100km").each(function(i, element) {  
          // prettyElement.push(element)
          // class="css-1100km e1aa0s8g1"
        // Save an empty result object
        var result = {};
      //   // Add the text and href of every link, and save them as properties of the result object
        result.headline = $(this)
          .find("h2")
          .text();
          // console.log(this)
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
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      console.log(result)
      });
      // Send a message to the client
      res.send("scrape complete");
    });
  });

  module.exports = app