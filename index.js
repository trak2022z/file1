//Exercise 1: Disney Movie Tracker
/**
 * section starter files
 */

"use strict";

const express = require("express");
const app = express();

const fs = require("fs").promises;
const multer = require("multer");

// for application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware
// for multipart/form-data (required with FormData)
app.use(multer().none()); // requires the "multer" module


// define 'add' endpoint here
//https://file1.tomkrok1.repl.co/add/
//POST
app.post("/add", async (req, res) => {
  res.type("text");
  //request body (Body -> form-data) parameters (movie, year, song, rating) with values
  let movie = req.body.movie;
  let year = req.body.year;
  let song = req.body.song;
  let rating = parseInt(req.body.rating);
  if (movie && year && song && rating) {
    try {
      let data = await fs.readFile("movies.json", "utf8");
      data = JSON.parse(data);
      let keys = Object.keys(data);
      data[movie] = {
        "release-year": year,
        "featured-song": song,
        "rotten-tomatoes": rating
      };
      await fs.writeFile("movies.json", JSON.stringify(data));
      if (keys.includes(movie)) {
        res.send("updated information for designated movie");
      } else {
        res.send("added information for designated movie");
      }
    } catch (err) {
      if (err.code === "ENOENT") {
        res.status(500).send("file does not exist");
      } else {
        res.status(500).send("something went wrong on the server");
      }
    }
  } else {
    res.status(400).send("Missing required parameters");
  }
});



//GET - movies
//https://file1.tomkrok1.repl.co/movies
app.get('/movies', async (req, res) => {
  res.type("text");
  try {
    let data = await fs.readFile("movies.json", "utf8");
    //console.log(data);  
    //res.send(data);
    data = JSON.parse(data);
    let result = '';
    let keys = Object.keys(data);
     for (let i = 0; i < keys.length; i++) {
       result+= keys[i] + '\n';
     } 
     res.send(result);
    
  } catch (err) {
      if (err.code === "ENOENT") {
        res.status(500).send("file does not exist");
      } else {
        res.status(500).send("something went wrong on the server");
      }
    }
 

  
});

const PORT = process.env.PORT || 8000;
app.listen(PORT);