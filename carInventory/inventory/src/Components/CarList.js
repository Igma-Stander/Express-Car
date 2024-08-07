import React, { useState, useEffect } from "react";
import UpdateCarForm from "./UpdateCarForm";
import DeleteCarButton from "./DeleteCarButton";

const CarList = ({ cars, setCars }) => {
  //state to hold list of cars
  // const [cars, setCars] = useState([]);
  // state to track which car is being edited
  const [editMode, setEditMode] = useState(null);

  //function handling update of cars
  const handleUpdateCar = (updatedCar) => {
    //map over array and update cars with matching ID
    const updatedCars = cars.map((car) =>
      car._id === updatedCar._id ? updatedCar : car
    );
    setCars(updatedCars);
    // exit edit mode after update
    setEditMode(null);
  };

  //function to handle deleting a car
  const handleDeleteCar = (carId) => {
    //filter out the car with matching id
    const updatedCars = cars.filter((car) => car._id !== carId);
    setCars(updatedCars);
  };

  return (
    <div>
      <h2 className="headings">All Cars</h2>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {/* map over cars array and render each car as a list item */}
        {cars.map((car) => (
          <li key={car._id} className="list">
            {/* conditional rendering based on editMode state */}
            {editMode === car._id ? (
              <UpdateCarForm car={car} onUpdateCar={handleUpdateCar} />
            ) : (
              <div>
                <div>
                  <strong>Make:</strong> {car.make}
                </div>
                <div>
                  <strong>Model:</strong> {car.model}
                </div>
                <div>
                  <strong>Registration:</strong> {car.registration}
                </div>
                <div>
                  <strong>Owner:</strong> {car.owner}
                </div>
                {/* edit button */}
                <button className="button" onClick={() => setEditMode(car._id)}>
                  Edit
                </button>

                {/* delete button component */}
                <DeleteCarButton
                  carId={car._id}
                  onDeleteCar={handleDeleteCar}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
