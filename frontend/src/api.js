import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

export const getEvents = () => API.get("/events");
export const addEvent = (event) => API.post("/events", event);
