// import * as dotenv from "dotenv";
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const Thing = require("./models/thing");
const bodyParser = require("body-parser");

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

app.post("/api/stuff", (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({ ...req.body });
  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré" }))
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

app.get("/api/stuff/:id", (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ message: error.message }));
});

app.get("/api/stuff", (req, res, next) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

module.exports = app;
