// import * as dotenv from "dotenv";
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const Thing = require("./models/thing");
const bodyParser = require("body-parser");
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

dotenv.config();

const app = express();

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion reussie !"))
  .catch(() => console.log("Connexion échouée!"));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/api/stuff", stuffRoutes);

app.use("/api/auth", userRoutes);

module.exports = app;
