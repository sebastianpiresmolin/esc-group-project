import { selectedChallenge } from "./api_fetch.js";
let arrayTimes = [];
let url = new URL(
  "https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=2023-12-12&challenge=4'"
);
let arrayParticipants = [];
let listTimes = undefined;
let listPart = undefined;

//Creating elements for modals in index.html and challenges.html
//Global modal elements
const modalBackground = document.getElementById("modal__bg");
modalBackground.classList.add("modal__background");
modalBackground.style.overflowY = "hidden";

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

// Close booking modal if background is clicked
modalBackground.addEventListener("click", function (event) {
  if (event.target === modalBackground) {
    closeModal();
  }
});

function closeModal() {
  modalBackground.style.display = "none";
  modalContainer1.style.display = "none";
  modalContainer2.style.display = "none";
  modalContainer3.style.display = "none";
  inputDate.value = "";
  inputName.value = "";
  inputMail.value = "";
  selecMenuTime.innerHTML = "";
  selectMenuPart.innerHTML = "";
  errorMsg.textContent = "";
}

//Step One Elements
const modalDate = document.createElement("p");
modalDate.classList.add("modal__date");

const inputDate = document.createElement("input");
inputDate.setAttribute("type", "date");
inputDate.classList.add("input__date");

const errorDiv = document.createElement("div");
const errorMsg = document.createElement("p");
errorMsg.classList.add("error__msg");

errorDiv.appendChild(errorMsg);

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

//Phone number
const modalPhone = document.createElement("p");

const inputPhone = document.createElement("input");
inputPhone.setAttribute("type", "tel");

//What time?
const modalTime = document.createElement("p");
modalTime.classList.add("modal__time");

const timeList = document.createElement("ul");
timeList.classList.add("time__list");

const selecMenuTime = document.createElement("select");
selecMenuTime.classList.add("select__menu__time");

const modalParticipants = document.createElement("p");
modalParticipants.classList.add("modal__participants");

const selectMenuPart = document.createElement("select");
selectMenuPart.classList.add("select__menu__part");

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
const nextYear = new Date(
  date.getFullYear(),
  date.getMonth() + 12,
  date.getDate()
);
const withinNextYear = nextYear.toISOString().substring(0, 10);

//Creating step one modal
export function displayModalStepOne() {
  modalBackground.style.display = "block";
  modalContainer1.style.display = "block";
  modalTitle.setAttribute("id", "modal1__title");
  modalSubTitle.textContent = "What date would you like to come?";
  modalDate.textContent = "Date";
  inputDate.value = currentDate;

  modalContainer1.append(
    modalTitle,
    modalSubTitle,
    modalDate,
    inputDate,
    errorDiv,
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
  modalPhone.textContent = "Phone number";
  modalTime.textContent = "What time?";
  modalParticipants.textContent = "How many participants?";

  modalContainer2.append(
    modalTitle,
    errorDiv,
    modalName,
    inputName,
    modalMail,
    inputMail,
    modalPhone,
    inputPhone,
    modalTime,
    selecMenuTime,
    modalParticipants,
    selectMenuPart,
    modalButtonSubmit
  );
  modalBackground.append(modalContainer2);
}

//eventlistener for list

//Creating step three modal
export async function displayModalStepThree() {
  modalBackground.style.display = "block";
  modalContainer2.style.display = "none";
  modalContainer3.style.display = "flex";

  modalTitleThankYou.textContent = "Thank you!";
  modalLinkBack.text = "Close window";
  modalLinkBack.setAttribute("href", "");

  modalContainer3.append(modalTitleThankYou, modalLinkBack);
  modalBackground.append(modalContainer3);
}

export async function availableTimes() {
  modalButtonSearch.addEventListener("click", function () {
    let params = new URLSearchParams(url.search);
    let challengeID = selectedChallenge.data.id;
    if (inputDate.value < currentDate || inputDate.value > withinNextYear) {
      errorMsg.textContent =
        "You must choose a date newer than today and within a year!";
      errorMsg.style.color = "red";
    } else {
      params.set("date", inputDate.value);
      params.set("id", parseInt(challengeID));

      url.search = params.toString();
      url = url.toString();

      displayTimesAndParticipants();
      displayModalStepTwo();
      errorMsg.textContent = "";
    }
    return url;
  });
}

export async function displayTimesAndParticipants() {
  let newUrl = url;
  const res = await fetch(newUrl);
  const data = await res.json();

  data.slots.forEach((slot) => {
    arrayTimes.push(slot);
    listTimes = document.createElement("option");
    listTimes.innerText = slot;
    selecMenuTime.appendChild(listTimes);
  });

  for (
    let i = selectedChallenge.data.minParticipants;
    i <= selectedChallenge.data.maxParticipants;
    i++
  ) {
    arrayParticipants.push(i);
  }
  arrayParticipants.forEach((element) => {
    listPart = document.createElement("option");
    listPart.innerText = element + " participants";
    selectMenuPart.appendChild(listPart);
  });
  return arrayTimes;
}

availableTimes();

function submitBooking() {
  modalButtonSubmit.addEventListener("click", function () {
    let challengeID = selectedChallenge.data.id;
    let name = inputName.value.trim();
    let nameOutput = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    let validName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    let emailOutput = inputMail.value.trim();
    let validPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    let phoneOutput = inputPhone.value;
    let dateOutput = inputDate.value;
    const validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (nameOutput.match(validName)) {
      if (emailOutput.match(validEmail)) {
        if (phoneOutput.match(validPhone)) {
          let timeInput = selecMenuTime.selectedOptions;
          let timeOutput = "";
          for (let i = 0; i < timeInput.length; i++) {
            timeOutput += timeInput[i].label;
          }
          console.log(arrayTimes);
          let partOutput = "";
          let partInput = selectMenuPart.selectedOptions;
          for (let i = 0; i < partInput.length; i++) {
            partOutput += partInput[i].label;
          }

          sendBookingData(
            challengeID,
            nameOutput,
            emailOutput,
            phoneOutput,
            dateOutput,
            timeOutput,
            parseInt(partOutput)
          );
          errorMsg.textContent = "";
          displayModalStepThree();

          return true;
        } else {
          errorMsg.textContent = "You must enter a 10-digit phone number";
          return false;
        }
      } else {
        errorMsg.textContent = "You must enter a valid email!";
        return false;
      }
    } else {
      errorMsg.textContent = "You must enter your first name and last name";
      return false;
    }
  });
}

submitBooking();

async function sendBookingData(
  id,
  name,
  email,
  phonenumber,
  date,
  time,
  participants
) {
  // Send data to API
  const response = await fetch(
    "https://lernia-sjj-assignments.vercel.app/api/booking/reservations",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Create object from booking data
      body: JSON.stringify({
        challenge: id,
        name: name,
        email: email,
        phonenumber: phonenumber,
        date: date,
        time: time,
        participants: participants,
      }),
    }
  );

  const data = await response.json();
  console.log(data);
}
