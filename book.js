//import { Challenge } from "./api_fetch";
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

//Creating elements for modals in index.html and challenges.html
//Global modal elements
const modalBackground = document.getElementById("modal__bg");
modalBackground.classList.add("modal__background");

const modalContainer1 = document.createElement("div");
modalContainer1.classList.add("modal__container1");
const modalContainer2 = document.createElement("div");
modalContainer2.classList.add("modal__container2");
const modalContainer3 = document.createElement("div");
modalContainer3.classList.add("modal__container3");

const modalTitle = document.createElement("h1");
modalTitle.classList.add("modal__title");

const modalSubTitle = document.createElement("h2");
modalSubTitle.classList.add("modal__subtitle");

//Step One Elements
const modalDate = document.createElement("p");
modalDate.classList.add("modal__date");

const inputDate = document.createElement("input");
inputDate.setAttribute("type", "date");
inputDate.classList.add("input__date");

const modalButtonSearch = document.createElement("button");
modalButtonSearch.classList.add("button__search");
modalButtonSearch.textContent = "Search available times";

//Step Two Elements
//Name
const modalName = document.createElement("p");
modalName.classList.add("modal__name");

const inputName = document.createElement("input");
inputName.setAttribute("type", "text");
inputName.classList.add("input__name");

//E-mail
const modalMail = document.createElement("p");
modalMail.classList.add("modal__name");

const inputMail = document.createElement("input");
inputMail.setAttribute("type", "text");
inputMail.classList.add("input__mail");

//What time?
const modalTime = document.createElement("p");
modalTime.classList.add("modal__time");

const timeList = document.createElement("ul");
timeList.classList.add("time__list");

const timeItems = document.createElement("li");
timeItems.classList.add("time__list__items");

const modalParticipants = document.createElement("p");
modalParticipants.classList.add("modal__participants");

const participantsList = document.createElement("ul");
participantsList.classList.add("participants__list");

const participantsItems = document.createElement("li");
participantsItems.classList.add("participants__list__items");

const modalButtonSubmit = document.createElement("button");
modalButtonSubmit.classList.add("button__submit");
modalButtonSubmit.textContent = "Submit booking";

//Modal Step Three
const modalTitleThankYou = document.createElement("h1");
modalTitleThankYou.classList.add("title__thankyou");

const modalLinkBack = document.createElement("a");
modalLinkBack.classList.add("modal__linkback");

//Append to main divs


//Creating date object
const date = new Date();
const currentDate = date.toISOString().substring(0, 10);

//Creating step one modal
async function displayModalStepOne() {
  modalBackground.style.display = "block";
  modalContainer1.style.display = "block";
  modalTitle.textContent = "Book room " + '"Title of room"' + "(step 1)";
  modalSubTitle.textContent = "What date would you like to come?";
  modalDate.textContent = "Date";
  inputDate.value = currentDate;

  modalContainer1.append(
    modalTitle,
    modalSubTitle,
    modalDate,
    inputDate,
    modalButtonSearch
  );

  modalBackground.append(modalContainer1);
}

//displayModalStepOne();
//displayModalStepTwo();
//displayModalStepThree();

//Creating step two modal
async function displayModalStepTwo() {
  modalBackground.style.display = "block";
  modalContainer1.style.display = "none";
  modalContainer2.style.display = "block";
  modalTitle.textContent = "Book room " + '"Title of room"' + " (step 2)";
  modalName.textContent = "Name";
  modalMail.textContent = "E-mail";
  modalTime.textContent = "What time?";
  modalParticipants.textContent = "How many participants?";

  modalContainer2.append(
    modalTitle,
    modalName,
    inputName,
    modalMail,
    inputMail,
    modalTime,
    timeList,
    modalParticipants,
    participantsList,
    modalButtonSubmit
  );

  timeList.append(timeItems);
  participantsList.append(participantsItems);
  modalBackground.append(modalContainer2);

  
}

//Creating step three modal
async function displayModalStepThree() {
  modalBackground.style.display = "block";
  modalContainer2.style.display = "none";
  modalContainer3.style.display = "block";

  modalTitleThankYou.textContent = "Thank you!";
  modalLinkBack.text = "Back to challenges";
  modalLinkBack.setAttribute("href", "challenges.html");

  modalContainer3.append(modalTitleThankYou, modalLinkBack);
  modalBackground.append(modalContainer3);

}

async function availableTimes() {
  modalButtonSearch.addEventListener("click", function () {
    let url = new URL(
      "https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=&challenge='"
    );
    let params = new URLSearchParams(url.search);

    params.set("date", inputDate.value);
    params.set("id", "4");

    url.search = params.toString();
    let new_url = url.toString();
    
    console.log(new_url);
    
    displayModalStepTwo();
  });
}

async function submitBooking() {
  modalButtonSubmit.addEventListener("click", function () {
    console.log(inputName.value);
    displayModalStepThree();
  }) 
}

async function displayAvailableTimes() {
  const res = await fetch(url);
  const data = await res.json();
  data.slots.forEach((slot) => {
    console.log(slot);
  });
}

availableTimes();
submitBooking();
//displayAvailableTimes();
