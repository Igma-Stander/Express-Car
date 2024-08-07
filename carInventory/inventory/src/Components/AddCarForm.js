import React, { useState } from "react";

const AddCarForm = ({ onAddCar, NewCar }) => {
  //states for all the fields
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [registration, setRegistration] = useState("");
  const [owner, setOwner] = useState("");

  //function to handle form submission
  const handleSubmit = async (e) => {
    //prevent default form submission
    e.preventDefault();

    try {
      const response = await fetch("/api/cars", {
        //HTTP method for POST
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //convert form data to JSON
        body: JSON.stringify({ make, model, registration, owner }),
      });
      const data = await response.json();
      // update the state with the new car data
      onAddCar(data);

      //clear input fields after submission
      setMake("");
      setModel("");
      setRegistration("");
      setOwner("");
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder="Make"
        value={make}
        onChange={(e) => setMake(e.target.value)}
        //make input field required
        required
      />
      <input
        className="input"
        type="text"
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        required
      />
      <input
        className="input"
        type="text"
        placeholder="Registration Number"
        value={registration}
        onChange={(e) => setRegistration(e.target.value)}
        required
      />
      <input
        className="input"
        type="text"
        placeholder="Owner"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        required
      />
      <button className="button" type="submit" onClick={NewCar}>
        Add Car
      </button>
    </form>
  );
};

export default AddCarForm;
