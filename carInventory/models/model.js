const mongoose = require("mongoose");

// define car schema with required fields
const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  registration: { type: String, required: true },
  owner: { type: String, required: true },
});

//create and export Car model
module.exports = mongoose.model("Car", carSchema);
