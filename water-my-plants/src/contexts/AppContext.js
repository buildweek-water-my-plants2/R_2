import React, { useState, createContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export const PlantContext = createContext();

export const AppProvider = (props) => {
  const [plant, setPlant] = useState([]);
  // const [user, setUser] = useState([]);

  return (
    <PlantContext.Provider value={{ plant, setPlant }}>
      {props.children}
    </PlantContext.Provider>
  );
};
