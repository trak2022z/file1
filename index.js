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

const PORT = process.env.PORT || 8000;
app.listen(PORT);