import React from "react";

const DeleteCarButton = ({ carId, onDeleteCar }) => {
  //function to handle deleting a car
  const handleDelete = async () => {
    try {
      //delete specific id
      const response = await fetch(`/api/cars/${carId}`, {
        //HTTP method
        method: "DELETE",
      });
      if (response.ok) {
        // update the state to remove the deleted car
        onDeleteCar(carId);
      } else {
        console.error("Failed to delete car");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <button className="button" onClick={handleDelete}>
      Delete Car
    </button>
  );
};

export default DeleteCarButton;
