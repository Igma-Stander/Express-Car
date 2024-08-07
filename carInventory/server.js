const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//importing routes from controller
const carRoutes = require("./controllers/controller");

//create express application
const app = express();
//define port number
const PORT = process.env.PORT || 5000;

//link to database
const uri =
  "mongodb+srv://igmastander:HyperionDev25@hyperiondev.7nngkun.mongodb.net/?retryWrites=true&w=majority&appName=HyperionDev";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      //connected successfully
      console.log("Successfully connected to the database!");
    },
    (err) => {
      //connecting error
      console.log("Could not connect to the database..." + err);
    }
  );

// middleware to parse url adn JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up routes
app.use("/api/cars", carRoutes);

// Start the express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
