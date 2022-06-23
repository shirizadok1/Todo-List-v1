//jshint esversion:6


const express = require("express");
const bodyParser = require("body-parser");
const date= require(__dirname+ "/date.js");

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  const day= date.getDate();
  // because we required the date.js into the const date, we can call the function inside by date();

  res.render("list", {listTitle: day, newListItems: items});
  // newListItems was created so I can pass the items array to another array and send it over

});

app.post("/", function(req, res) {

  const item = req.body.newItem; // the name newItem is equal to a variable

  if(req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else{
    items.push(item);
    res.redirect("/");

  }

});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});


app.get("/about", function(req, res){
  res.render("about");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
