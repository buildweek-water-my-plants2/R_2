import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import CreatePlant from "../plant/CreatePlant";
import { PlantContext } from "../../contexts/AppContext";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import styled from "styled-components";
import PlantCard from "./PlantCard";

const CreatePlantForm = styled.div`
  margin: 30px 40px 10% 380px;
  justify-content: center;
  background: #2d3142;
  color: black;
  width: 40%;
  height: 50vh;
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

const H2 = styled.h2`
  font-size: 2rem;
  color: #4f5d75;
`;

const Plant = (props) => {
  const [plants, setPlants] = useState([]);
  const [allPlants, setAllPlants] = useState([]);

  const postNewPlant = (newPlant) => {
    axiosWithAuth()
      .post("/api/plants/user/", newPlant)
      .then((res) => {
        console.log(res.data);
        setAllPlants(res.data);
        setPlants(
          res.data.filter(
            (plant) => plant.created_by == localStorage.getItem("id")
          )
        );
      })
      .catch((err) => {
        console.log(err, "Failed to post new plant");
      });
  };
  const refreshPlant = (props) => {
    const userId = localStorage.getItem("id");
    axiosWithAuth()
      .get(`/api/plants/${id}`)
      .then((res) => {
        console.log(res);
        setPlants(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const refreshAllPlant = (props) => {
    axiosWithAuth()
      .get("/api/plants")
      .then((res) => {
        console.log(res);
        setAllPlants(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    refreshPlant();
    refreshAllPlant();
  }, []);

  const submitPlant = (data) => {
    console.log(data);
    postNewPlant(data);
  };

  const { register, handleSubmit, errors } = useForm();
  console.log(errors);

  return (
    <>
      <CreatePlantForm>
        <form onSubmit={handleSubmit(submitPlant)}>
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
      </CreatePlantForm>

      <div>
        <div className="plantList">
          {allPlants.map((plant) => {
            return <PlantCard {...plant} />;
          })}
          <h2>My Plants</h2>
          {plants.map((plant, index) => {
            <CreatePlant plants={plants} setPlants={setPlants} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Plant;
