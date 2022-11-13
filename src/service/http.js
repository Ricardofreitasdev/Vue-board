import axios from "axios";

const http = axios.create({
  baseURL: "https://api-node-graphql.herokuapp.com/",
});

export default http;
