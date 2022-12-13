const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
require("colors");
const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const uri = process.env.DATABASE;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// Connect to Database
const connect = async () => {
  client.connect();
};
connect();

// Database Collections
const blogCollection = client.db("LetsBlog").collection("blogs");

// Default Route
app.get("/", async (req, res) => {
  res.send("Welcome to Let's Blog's server side..!");
});

app.listen(PORT, () => {
  console.log(`Blog is Running on: ${PORT}`.blue);
});
