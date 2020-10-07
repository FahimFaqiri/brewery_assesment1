const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
// create a variable port and set port either: enviroment variable or 3000
const port = process.env.PORT || 3000;

// listen to port and console log if succes
app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});
// use the public folder
app.use(express.static("public"));
// limit the rate to the API
app.use(express.json({ limit: "1mb" }));
// retrieve information with the get request
app.get("/:name/", async (request, response) => {
  // create a variable called api_key and hide the api_key
  const api_key = process.env.API_KEY;
  // create a variable api_url and define the actual api url
  const api_url = `https://sandbox-api.brewerydb.com/v2/locations?key=${api_key}`;
  // create a variable called api_response and fetch data from the api url
  const api_response = await fetch(api_url);
  // create a variable called api_data and hold the fetched data
  const api_data = await api_response.json();

  // create a object called data and hold the data
  const data = {
    api_content: api_data,
  };
  // send the data with a response.json
  response.json(data);
});
