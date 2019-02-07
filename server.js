var express = require("express");
var mongoose = require("mongoose");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/web_scraper", { useNewUrlParser: true });

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Routes (tells server where our routes are go here to loo at them)
var controller = require("./controller")
app.use(controller)

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// Start the server

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});

// // Route for getting all Articles from the db
// app.get("/articles", function(req, res) {
//   // TODO: Finish the route so it grabs all of the articles
//   db.Article.find({})
//   .then(function(results){
    
//     res.json(results)
//   })
//   .catch(function(error){
//     res.json(error)
//   })
// });

// // Route for grabbing a specific Article by id, populate it with it's note
// app.get("/articles/:id", function(req, res) {
//   // TODO
//   // ====
//   // Finish the route so it finds one article using the req.params.id,
//   // and run the populate method with "note",
//   // then responds with the article with the note included
//   db.Article.find({_id: req.params.id})
//   .populate("Note")
//   .then(function(results){
//     res.json(results)
//   })
//   .catch(function(erro){
//     res.json(error)
//   })
// });

// // Route for saving/updating an Article's associated Note
// app.post("/articles/:id", function(req, res) {
//   // TODO
//   // ====
//   // save the new note that gets posted to the Notes collection
//   // then find an article from the req.params.id
//   // and update it's "note" property with the _id of the new note
//   // new so new aricles come back
//   console.log(req.params.id)
//   db.Note.create(req.body).then(function(note){
//     return db.Article.findOneAndUpdate({_id: req.params.id}, {note: note._id}, {new: true})
//   })
//   .then(function(updatedArticle){
//     res.json(updatedArticle)
//   })
//   .catch(function(error){
//     res.json(error)
//   })
// });