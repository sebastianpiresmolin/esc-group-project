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
const modalBackground = document.getElementById("modal__bg");
const modalContainer = document.createElement("div");
const modalTitle = document.createElement("h1");
const modalSubTitle = document.createElement("p");
//Creating step one modal
 async function displayModalStepOne() {
  
  modalBackground.classList.add("modal__background");

  modalContainer.classList.add("modal__container");

  modalTitle.classList.add("modal__title");
  modalTitle.textContent = "Book room " + '"Title of room"' + "(step 1)";

  modalSubTitle.classList.add("modal__subtitle");
  modalSubTitle.textContent = "Date"

  const modalDate = document.createElement("input");
  modalDate.setAttribute("type", "date");
  modalDate.classList.add("modal__date");

  const modalButtonSearch = document.createElement("button");
  modalButtonSearch.classList.add("modal__button");
  modalButtonSearch.textContent = "Search available times";

  modalContainer.appendChild(modalTitle);
  modalContainer.appendChild(modalSubTitle);
  modalContainer.appendChild(modalDate);
  modalContainer.appendChild(modalButtonSearch);
  modalBackground.appendChild(modalContainer);
}

displayModalStepOne();

//Creating step two modal
/*asyncfunction displayStepTwoModal() {
  const modalBackground2 = document.createElement("div");
  modalBackground2.classList.add("modal__background2");

  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal__container");

  const modalTitle2 = document.createElement("h1");
  modalTitle2.classList.add("modal__title");
  modalTitle2.textContent = "Book room " + '"Title of room"' + " (step 2)";

  //Name
  const modalName = document.createElement("p");
  modalName.classList.add("modal__subtitle__name");

  const inputName = document.createElement("input");
  inputName.setAttribute("type", "text");
  inputName.classList.add("modal__name");

  //E-mail
  const modalMail = document.createElement("p");
  modalMail.classList.add("modal__subtitle__name");

  const inputMail = document.createElement("input");
  inputMail.setAttribute("type", "text");
  inputMail.classList.add("modal__mail");

  //What time?
  const modalTime = document.createElement("p");
  modalTime.classList.add("modal__subtitle__name");

  const inputTime = document.createElement("input");
  inputTime.setAttribute("type", "text");
  inputTime.classList.add("modal__time");

  const modalButton = document.createElement("button");
  modalButton.classList.add("modal__button");
  modalButton.textContent("Submit booking")
}

//Creating step three modal
function displayStepThreeModal() {}
*/
