// create a variable called beerList with value of DOM element beerList
const beerList = document.getElementById("beerList");
// creata a variable called searchBar with value of DOM element searchbar
const searchBar = document.getElementById("searchBar");
// create emtpy array jsonData
let jsonData = [];

// create event listener on keyup for every pressed key
searchBar.addEventListener("keyup", (e) => {
  // convert string to lowerCase
  const searchString = e.target.value.toLowerCase();
  // filter data by name
  const filteredData = jsonData.filter((names) => {
    // return the name and the country property and check if includes input
    return (
      names.name.toLowerCase().includes(searchString) ||
      names.country.name.toLowerCase().includes(searchString)
    );
  });
  // display info on the UI
  displayInfo(filteredData);
});

// create a async function called callBeers
async function callBeers() {
  // create a variable called locations holding the url endpoint
  const api_url = `locations/`;
  // create a variable called response and fetch the response from the server side client
  const response = await fetch(api_url);
  // create a variable called json and hold response object info
  const json = await response.json();
  // use to jsonData array to hold the queryd response from json
  jsonData = json.api_content.data;
  // display the jsonData to the UI with the displayInfo function
  displayInfo(jsonData);
}

// create a function called displayInfo with data parameter
const displayInfo = (data) => {
  // create a htmlString and map through the data parameter(jsonData)
  const htmlString = data
    .map((data) => {
      // return plain html string
      return `
          <li class="beerInfo">
              <h2>${data.name}</h2>
              <p>Country: ${data.country.name}</p>
          </li>
      `;
    })
    .join("");
  // convert html string to actual html in the DOM
  beerList.innerHTML = htmlString;
};

// call function callBeers()
callBeers();
