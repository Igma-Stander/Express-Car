import React, { useState } from "react";

const UpdateCarForm = ({ car, onUpdateCar }) => {
  //initialized states with current fields
  const [make, setMake] = useState(car.make);
  const [model, setModel] = useState(car.model);
  const [registration, setRegistration] = useState(car.registration);
  const [owner, setOwner] = useState(car.owner);

  //same as previous form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/cars/${car._id}`, {
        //HTTP method for updates
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ make, model, registration, owner }),
      });
      const data = await response.json();
      onUpdateCar(data);
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  return (
    //create another form for changes to data
    <form onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        value={make}
        onChange={(e) => setMake(e.target.value)}
        required
      />
      <input
        className="input"
        type="text"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        required
      />
      <input
        className="input"
        type="text"
        value={registration}
        onChange={(e) => setRegistration(e.target.value)}
        required
      />
      <input
        className="input"
        type="text"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        required
      />
      <button className="button" type="submit">
        Update Car
      </button>
    </form>
  );
};

export default UpdateCarForm;
