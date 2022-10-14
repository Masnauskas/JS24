//url
const PROPERTY_END_POINT = "https://robust-safe-crafter.glitch.me/";

//navigate to index.html
const seePropertiesButton = document.getElementById("go-to-properties");
seePropertiesButton.addEventListener("click", () => {
  location.href = "./index.html";
});

//post to URL
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const image = document.getElementById("add-image").value.trim();
  const city = document.getElementById("add-city").value.trim();
  const price = document.getElementById("add-price").value;
  const description = document.getElementById("add-description").value;
  const h1Element = document.getElementById("formFilled");
  if (image && city && price && description) {
    fetch(PROPERTY_END_POINT, {
      method: "POST",
      body: JSON.stringify({
        image: image,
        city: city,
        price: price,
        description: description,
      }),
      headers: { "Content-type": "application/json; charset=utf-8" },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function () {
        h1Element.textContent = " Your data has been successfully uploaded";
      })
      .catch((error) => console.error("Error:", error));
  } else {
    h1Element.textContent = "Try again";
  }
});
