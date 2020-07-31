import axios from "axios";

export const axiosWithAuth = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  console.log(token);
  return axios.create({
    headers: {
      Authorization: token,
    },
    baseURL: "https://jswatermyplants-backend.herokuapp.com",
  });
};
