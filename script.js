//url
const PROPERTY_END_POINT = "https://robust-safe-crafter.glitch.me/";

let dataArray = [];

//format numbers by putting a comma between thousands
function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//draw city buttons
function drawCityButtons(data) {
  const filterButtons = document.getElementById("filter-buttons");
  data.forEach((dataItem) => {
    const cityButtons = document.createElement("button");
    cityButtons.textContent = dataItem.city;
    cityButtons.classList.add("city-button");

    filterButtons.append(cityButtons);
  });
}

//draw property cards
function drawProperties(data) {
  const propertyGrid = document.getElementById("property-grid");
  propertyGrid.innerHTML = "";
  data.forEach((dataItem) => {
    const mainBox = document.createElement("div");
    mainBox.classList.add("property-box");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    const img = document.createElement("img");
    img.src = dataItem.image;
    img.classList.add("property-img");
    imgContainer.append(img);

    const descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("description-container");

    const price = document.createElement("h1");
    price.textContent = "\u20AC" + numberWithCommas(dataItem.price);

    const city = document.createElement("p");
    city.textContent = dataItem.city;
    city.classList.add("city");

    const description = document.createElement("p");
    description.textContent = dataItem.description;

    descriptionContainer.append(price, city, description);

    mainBox.append(imgContainer, descriptionContainer);
    propertyGrid.append(mainBox);
  });
}

//fetch

async function getPropertyData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      data = await response.json();
      dataArray = data;
      console.log(dataArray);
      //create city array
      cityArray = dataArray.map((item) => {
        return {
          city: item.city,
        };
      });
      //remove duplicate city names
      uniqueCities = cityArray.reduce((unique, o) => {
        if (!unique.some((obj) => obj.city === o.city)) {
          unique.push(o);
        }
        return unique;
      }, []);

      console.log(uniqueCities);

      drawCityButtons(uniqueCities);

      drawProperties(dataArray);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

//filter by cities function
function filterCities(event) {
  //click event targets <div id="filter-buttons"> which contains all filter buttons
  if (event.target.tagName.toLowerCase() === "button") {
    const isSelected = event.target.classList.contains("active");
    if (isSelected) {
      drawProperties(dataArray);
    } else {
      const clickedCity = event.target.innerText;
      drawProperties(
        dataArray.filter((dataItem) => dataItem.city === clickedCity)
      );
      const filterButtons = event.target.parentNode.children;
      for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].classList.remove("active");
      }
    }
    event.target.classList.toggle("active");
  }
}
//click eventlistener
document
  .getElementById("filter-buttons")
  .addEventListener("click", filterCities);

//navigate to add.html
const addPropertyButton = document.getElementById("add-property-button");
addPropertyButton.addEventListener("click", () => {
  location.href = "./add.html";
});

//remove filters
document.getElementById("showAll").addEventListener("click", () => {
  drawProperties(dataArray);
  const filterButtons = document.getElementsByClassName("city-button");
  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].classList.remove("active");
  }
});

getPropertyData(PROPERTY_END_POINT);
