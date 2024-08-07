import React, { useState, useEffect } from "react";
import "./App.css";
import AddCarForm from "./Components/AddCarForm";
import CarList from "./Components/CarList";

function App() {
  //store list of cars
  const [cars, setCars] = useState([]);

  useEffect(() => {
    //function to fetch cars from API
    const fetchCars = async () => {
      try {
        const response = await fetch("/api/cars");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        //parse response data as JSON
        const data = await response.json();
        //update cars state with fetched data
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, [setCars]);

  //handle adding new car to list
  const handleAddCar = async (newCar) => {
    try {
      const response = await fetch("/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      //add newCar to array
      setCars([...cars, data]);
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <div className="App">
      <h1 className="headings">Car Inventory</h1>

      <AddCarForm onAddCar={handleAddCar} />
      <hr />
      <CarList cars={cars} setCars={setCars} />
      <br />
    </div>
  );
}

export default App;
