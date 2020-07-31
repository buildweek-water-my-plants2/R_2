import React, { useState } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const PlantBox = styled.div`
  margin: 30px 40px 0px 380px;
  justify-content: center;
  background: #2d3142;
  color: black;
  width: 40%;
  height: 70vh;
  border: 4px solid #ef8354;
  border-radius: 25%;
  color: white;
`;
const PlantInput = styled.div`
  flex-direction: column;
  justify-content: space-betwen;
  padding: 10px;
  margin: 10% auto 10% auto;
  width: 40%;
`;

const Button = styled.button`
  background: #ef8354;
  height: 30px;
  width: 150px;
  border-radius: 20%;
`;

const deletePlant = (id, refreshPlant) => {
  axiosWithAuth()
    .delete(`/api/plants/${id}`)
    .then((res) => {
      console.log("Plant Deleted");
      refreshPlant();
    })
    .catch((err) => {
      console.log(err, "Failed to delete plant");
    });
};

const finalizePlant = (id, refreshPlant, plant, toggleEdit, edit) => {
  axiosWithAuth()
    .put(`/api/plants/${id}`, plant)
    .then((res) => {
      console.log("Student Edited");
      toggleEdit(!edit);
      refreshPlant();
    })
    .catch((err) => {
      console.log(err, "Failed to edit plant");
    });
};

const PlantCard = ({ plant, refreshPlant }) => {
  const [edit, toggleEdit] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) =>
    finalizePlant(plant.id, refreshPlant, data, toggleEdit, edit);
  console.log(errors);
  return edit == false ? (
    <div>
      <h2>
        {plant.title} {plant.description} {plant.h20Freq} {plant.species}
      </h2>
      <button onClick={() => deletePlant(plant.id, refreshPlant)}>
        Deleted
      </button>
      <button onClick={() => toggleEdit(!edit)}>Edit</button>
    </div>
  ) : (
    <div>
      <PlantBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PlantInput>
            <input
              className="forms"
              type="text"
              placeholder="Title"
              name="title"
              ref={register({ required: true, min: 2, maxLength: 80 })}
            />
            <textarea
              name="description"
              placeholder="description"
              ref={register({ required: true, max: 2, maxLength: 300 })}
            />
            <input
              className="forms"
              type="text"
              placeholder="h20Freq"
              name="h20Freq"
              ref={register({
                required: true,
                min: 2,
                maxLength: 128,
              })}
            />
            <input
              className="forms"
              type="text"
              placeholder="species"
              name="species"
              ref={register({ required: true, min: 2, maxLength: 128 })}
            />
            <Button className="forms" type="submit">
              Submit
            </Button>
          </PlantInput>
        </form>
      </PlantBox>

      <button onClick={() => toggleEdit(!edit)}>Cancel</button>
    </div>
  );
};

export default PlantCard;
