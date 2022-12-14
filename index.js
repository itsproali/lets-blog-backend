const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
const blogCollection = client.db("test").collection("blogs");

// Default Route
app.get("/", async (req, res) => {
  res.send("Welcome to Let's Blog's server side..!");
});

// Get All Blogs
app.get("/blogs", async (req, res) => {
  const data = await blogCollection.find({}).toArray();
  res.status(200).send({ success: true, data });
});

// Get a Single Blog
app.get("/blog/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };
  const data = await blogCollection.findOne(query);
  res.status(200).send({ success: true, data });
});

// Create a New Blog
app.post("/add-blog", async (req, res) => {
  const blog = req.body;
  const data = await blogCollection.insertOne(blog);
  res.status(200).send({ success: true, data });
});

// Delete a Blog
app.delete("/delete-blog", async (req, res) => {
  const query = { _id: ObjectId(req.body) };
  const data = await blogCollection.deleteOne(query);
  res.status(200).send({ success: true, data });
});

// Total views Increment
app.patch("/views-increment", async (req, res) => {
  const { _id, views } = req.body;
  const query = { _id: ObjectId(_id) };
  const data = await blogCollection.updateOne(query, { $set: { views } });
  res.status(200).send({ success: true, data });
});

app.listen(PORT, () => {
  console.log(`Blog is Running on: ${PORT}`.blue);
});
