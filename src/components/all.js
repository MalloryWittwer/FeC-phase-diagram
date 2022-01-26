const clickableAreas = document.querySelectorAll(".areas path");
const infoWindow = document.getElementById("dynamic-info");

const handleGotClicked = (area) => {
  fetch(`../infos/${area.id}.html`)
    .then((response) => response.text())
    .then((html) => (infoWindow.innerHTML = html))
    .catch((err) => console.warn("Something went wrong.", err));
};

clickableAreas.forEach((area) => {
  area.addEventListener("mouseover", (e) => handleGotClicked(area));
});
