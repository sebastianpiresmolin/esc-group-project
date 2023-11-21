//Book Room
let stepOneWindow = document.querySelector(".modal__stepOne");
let stepTwoWindow = document.querySelector(".modal__stepTwo");
let stepThreeWindow = document.querySelector(".modal__stepThree");

let btnBookRoom = document.querySelector(".buttonBox__button");
let btnSearch = document.querySelector(".button__search");
let btnSubmit = document.querySelector(".button__submit");
let linkBackToChallenges = document.querySelector(".link__back");

let bookDate;
let bookName;
let bookEmail;
let bookTime;
let bookParticipants;
/*
btnBookRoom.addEventListener("click", () => {
  stepOneWindow.style.display = "block";
});

btnSearch.addEventListener("click", () => {
  stepOneWindow.style.display = "";
  stepTwoWindow.style.display = "block";
  bookDate = document.querySelector(".input__date").value;
  console.log(bookDate);
});

btnSubmit.addEventListener("click", () => {
  stepTwoWindow.style.display = "";
  stepThreeWindow.style.display = "block";
  bookName = document.getElementById("name").value;
  bookEmail = document.getElementById("e-mail").value;
  bookTime = document.getElementById("time").value;
  bookParticipants = document.querySelector(".sBtn__text").innerText;
  console.log(bookName, bookEmail, bookTime, bookParticipants);
});

linkBackToChallenges.addEventListener("click", () => {
  stepThreeWindow.style.display = "";
});
*/
//Select options
const optionMenu = document.querySelector(".modal__select__participants");
const selectBtn = document.querySelector(".select__button");
const options = document.querySelectorAll(".options");
const sBtnText = document.querySelector(".sBtn__text");
/*
selectBtn.addEventListener("click", () =>
  optionMenu.classList.toggle("active")
);

options.forEach((option) => {
  option.addEventListener("click", () => {
    let selectedOption = option.querySelector(".option__text").innerText;
    sBtnText.innerText = selectedOption;
  });
});
*/
//fetch challenge data
const challengesArray = [];
async function getChallengesData() {
  const url = "https://lernia-sjj-assignments.vercel.app/api/challenges";
  const res = await fetch(url);
  const data = await res.json();

  for (let i = 0; i < data.challenges.length; i++) {
    challengesArray.push(data.challenges[i]);
  }
}

getChallengesData();
console.log("Challenges", challengesArray);

//DATE
const date = new Date("YYYY-MM-DD");

async function displayAvailableTimes() {
  const res = await fetch(
    "https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=2023-12-12&challenge=4"
  );
  const data = await res.json();
  data.slots.forEach((slot) => {
    console.log(slot);
  });
}

displayAvailableTimes();

//create booking
async function createBooking() {
  const res = await fetch(
    "https://lernia-sjj-assignments.vercel.app/api/booking/reservations",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        challenge: 4,
        name: bookName,
        email: bookEmail,
        date: bookDate,
        time: bookTime,
        participants: bookParticipants,
      }),
    }
  );
  const data = await res.json();
  console.log(data);
}

//Creating step one modal
async function displayModalStepOne() {
  const modalBackground = document.getElementById("modal__background");
  modalBackground.classList.add("modal__background2");

  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal__container");

  const modalTitle = document.createElement("h1");
  modalTitle.classList.add("modal__title");
  modalTitle.textContent = "Book room " + '"Title of room"' + "(step 1)";

  const modalSubTitle = document.createElement("p");
  modalSubTitle.classList.add("modal__subtitle");

  const modalDate = document.createElement("input");
  modalDate.setAttribute("type", "date");
  modalDate.classList.add("modal__date");

  const modalButton = document.createElement("button");
  modalButton.classList.add("modal__button");

  modalContainer.appendChild(modalTitle, modalSubTitle, modalDate, modalButton);
  modalBackground.appendChild(modalContainer);
}

displayModalStepOne();

//Creating step two modal
function displayStepTwoModal() {
  const modalBackground = document.createElement("div");
  modalBackground.classList.add("modal__background");

  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal__container");

  const modalTitle = document.createElement("h1");
  modalTitle.classList.add("modal__title");
  modalTitle.textContent = "Book room " + '"Title of room"' + "(step 2)";

  const modalSubTitle = document.createElement("p");
  modalSubTitle.classList.add("modal__subtitle");

  const modalDate = document.createElement("input");
  modalDate.setAttribute("type", "date");
  modalDate.classList.add("modal__date");

  const modalButton = document.createElement("button");
  modalButton.classList.add("modal__button");
}
//Creating step three modal
function displayStepThreeModal() {}

class Reservation {}

class AvailableTimes {}
