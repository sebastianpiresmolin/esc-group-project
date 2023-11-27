import { selectedChallenge } from "./api_fetch.js";
let arrayTimes = [];
let url = new URL(
  "https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=2023-12-12&challenge=4'"
);

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
modalTitle.setAttribute("id", "modal1title");

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
export function displayModalStepOne(container, title) {
  modalBackground.style.display = "block";
  modalContainer1.style.display = "block";
  modalTitle.setAttribute("id", "modal1__title");
  modalSubTitle.textContent = "What date would you like to come?";
  modalDate.textContent = "Date";
  inputDate.value = currentDate;
  participantsList;

  modalContainer1.append(
    modalTitle,
    modalSubTitle,
    modalDate,
    inputDate,
    modalButtonSearch
  );

  modalBackground.append(modalContainer1);
  const modal1 = modalBackground;
  const modal1title = modalTitle;
  return modal1, modal1title;
}

//Creating step two modal
function displayModalStepTwo() {
  modalTitle.textContent =
    'Book Room: "' + selectedChallenge.data.title + '" (Step 2)';
  modalBackground.style.display = "block";
  modalContainer1.style.display = "none";
  modalContainer2.style.display = "block";
  modalTitle.setAttribute("id", "modal2__title");
  modalName.textContent = "Name";
  modalMail.textContent = "E-mail";
  modalTime.textContent = "What time?";
  modalParticipants.textContent = "How many participants?";

 console.log("Efter loop", arrayTimes);

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

  modalBackground.append(modalContainer2);
}

//Creating step three modal
export async function displayModalStepThree() {
  modalBackground.style.display = "block";
  modalContainer2.style.display = "none";
  modalContainer3.style.display = "block";

  modalTitleThankYou.textContent = "Thank you!";
  modalLinkBack.text = "Back to challenges";
  modalLinkBack.setAttribute("href", "challenges.html");

  modalContainer3.append(modalTitleThankYou, modalLinkBack);
  modalBackground.append(modalContainer3);
}


export async function availableTimes() {
  modalButtonSearch.addEventListener("click", function () {
    
    let params = new URLSearchParams(url.search);
    let challengeID = selectedChallenge.data.id;

    params.set("date", inputDate.value);
    params.set("id", parseInt(challengeID));

    url.search = params.toString();
    url = url.toString();

    displayAvailableTimes();
    displayModalStepTwo();
    
    console.log(url)

    return url;
  });
}



export async function displayAvailableTimes() {
  let newUrl = url;
  const res = await fetch(newUrl);
  const data = await res.json();

  data.slots.forEach((slot) => {
    arrayTimes.push(slot);
    let li = document.createElement('li');
    li.innerText = slot;
    timeList.appendChild(li);
    console.log(slot);
  });
  return arrayTimes;
}
availableTimes();
submitBooking();

for (let i = 0; i < arrayTimes.length; ++i) {
  let li = document.createElement('li');
  li.innerText = arrayTimes[i];
  timeList.appendChild(li);
}


async function submitBooking() {
  modalButtonSubmit.addEventListener("click", function () {
    console.log(inputName.value);
    console.log(inputMail.value);
    displayModalStepThree();
  });
}

//create booking
export async function createBooking() {
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

class Reservation { 
  constructor(challenge, name, email, date, time, participants) {
    this.challenge = challenge;
    this.name = name;
    this.email = email;
    this.date = date;
    this.time = time;
    this.participants = participants;
  }
}