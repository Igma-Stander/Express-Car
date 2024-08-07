const express = require("express");
const router = express.Router();
//importing Car model
const Car = require("../models/model");

//POST a new car
router.post("/", async (req, res) => {
  try {
    //create new car with data form request body
    const newCar = new Car(req.body);
    await newCar.save();
    //respond with new car
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//GET all cars
router.get("/", async (req, res) => {
  try {
    //get all cars from database
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: err.message });
  }
});

// READ a single car by ID
//using middleware function getCar
router.get("/:id", getCar, (req, res) => {
  res.json(res.car);
});

// UPDATE a car by ID
router.put("/:id", getCar, async (req, res) => {
  //update properties based on request
  if (req.body.make != null) {
    res.car.make = req.body.make;
  }
  if (req.body.model != null) {
    res.car.model = req.body.model;
  }
  if (req.body.registration != null) {
    res.car.registration = req.body.registration;
  }
  if (req.body.owner != null) {
    res.car.owner = req.body.owner;
  }
  try {
    //save updated car to database
    const updatedCar = await res.car.save();
    //respond with updated car
    res.json(updatedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a car by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get a single car by ID
async function getCar(req, res, next) {
  let car;
  try {
    //find car by ID
    car = await Car.findById(req.params.id);
    if (car == null) {
      return res.status(404).json({ message: "Cannot find car" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  //attach car object to response object
  res.car = car;
  //call middleware function
  next();
}

module.exports = router;
