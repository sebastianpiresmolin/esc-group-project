
/* ------------------------MOBILE MENU------------------------ */

document.getElementById("headerButton").addEventListener('click', function() {
    let menuOverlay = document.getElementById("menuOverlay");
    let popinMenu = document.getElementById("popinMenu");

  menuOverlay.style.display = "block"; // This shows my white overlay
  popinMenu.style.display = "flex"; // This shows my popin menu

  setTimeout(function () {
    popinMenu.style.animation = "grow 0.1s linear";
    popinMenu.style.opacity = 1;
  }, 100);

  setTimeout(function () {
    menuOverlay.style.animation = "fadein 0.3s linear";
    menuOverlay.style.opacity = 1;
  }, 10);

  document.documentElement.style.overflowY = "hidden"; // This disables the ability to scroll behind the menu
});

document.getElementById("closebtn").addEventListener("click", function () {
  let menuOverlay = document.getElementById("menuOverlay");
  let popinMenu = document.getElementById("popinMenu");

  menuOverlay.style.animation = ""; // This resets the animation between each use.
  popinMenu.style.animation = ""; // Otherwise its buggy until the page refreshes.

  menuOverlay.style.opacity = 0;
  popinMenu.style.opacity = 0;

  setTimeout(function () {
    menuOverlay.style.display = "none"; // This hides my white overlay
    popinMenu.style.display = "none"; // This hides my popin menu
  }, 200);

  document.documentElement.style.overflowY = "auto"; // This enables the ability to scroll again
});

//Book Room
let stepOneWindow = document.querySelector(".modal__stepOne");
let stepTwoWindow = document.querySelector(".modal__stepTwo");
let stepThreeWindow = document.querySelector(".modal__stepThree");

let btnBookRoom = document.querySelector(".buttonBox__button");
let btnSearch = document.querySelector(".button__search");
let btnSubmit = document.querySelector(".button__submit");

btnBookRoom.addEventListener("click", () => {
  stepOneWindow.style.display = "block";
});

btnSearch.addEventListener("click", () => {
  stepOneWindow.style.display = "";
  stepTwoWindow.style.display = "block";
  console.log("hello");
});

btnSubmit.addEventListener("click", () => {
  stepTwoWindow.style.display = "";
  stepThreeWindow.style.display = "block";
  console.log("hello");
});

//Select options
const optionMenu = document.querySelector(".modal__select");
const selectBtn = document.querySelector(".select__button");
const options = document.querySelectorAll(".options");
const sBtnText = document.querySelector(".sBtn__text");

selectBtn.addEventListener("click", () =>
  optionMenu.classList.toggle("active")
);

options.forEach(option => {
  option.addEventListener("click", () => {
    let selectedOption = option.querySelector(".option__text").innerText;
    sBtnText.innerText = selectedOption;
  });
});

/*------------------------MOBILE MENU------------------------*/
