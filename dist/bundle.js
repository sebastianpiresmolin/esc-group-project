(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
document.getElementById("headerButton").addEventListener("click", function() {
  let menuOverlay = document.getElementById("menuOverlay");
  let popinMenu = document.getElementById("popinMenu");
  menuOverlay.style.display = "block";
  popinMenu.style.display = "flex";
  setTimeout(function() {
    popinMenu.style.animation = "grow 0.1s linear";
    popinMenu.style.opacity = 1;
  }, 100);
  setTimeout(function() {
    menuOverlay.style.animation = "fadein 0.3s linear";
    menuOverlay.style.opacity = 1;
  }, 10);
  document.documentElement.style.overflowY = "hidden";
});
document.getElementById("closebtn").addEventListener("click", function() {
  let menuOverlay = document.getElementById("menuOverlay");
  let popinMenu = document.getElementById("popinMenu");
  menuOverlay.style.animation = "";
  popinMenu.style.animation = "";
  menuOverlay.style.opacity = 0;
  popinMenu.style.opacity = 0;
  setTimeout(function() {
    menuOverlay.style.display = "none";
    popinMenu.style.display = "none";
  }, 200);
  document.documentElement.style.overflowY = "auto";
});
let filterButton = document.getElementById("filterButton");
let filterWindow = document.getElementById("filterWindow");
if (filterButton && filterWindow) {
  document.getElementById("closeFilter").addEventListener("click", function() {
    filterWindow.style.display = "none";
    filterButton.style.display = "block";
  });
  document.getElementById("filterButton").addEventListener("click", function() {
    setTimeout(function() {
      filterWindow.style.animation = "grow 0.1s ease";
      filterWindow.style.opacity = 1;
      filterWindow.style.display = "flex";
      filterButton.style.display = "none";
    }, 10);
  });
}
let arrayTimes = [];
let url = new URL(
  "https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=2023-12-12&challenge=4'"
);
let arrayParticipants = [];
let listTimes = void 0;
let listPart = void 0;
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
modalBackground.addEventListener("click", function(event) {
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
const modalName = document.createElement("p");
modalName.classList.add("modal__name");
const inputName = document.createElement("input");
inputName.setAttribute("type", "text");
inputName.classList.add("input__name");
const modalMail = document.createElement("p");
modalMail.classList.add("modal__name");
const inputMail = document.createElement("input");
inputMail.setAttribute("type", "text");
inputMail.classList.add("input__mail");
const modalPhone = document.createElement("p");
const inputPhone = document.createElement("input");
inputPhone.setAttribute("type", "tel");
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
const modalTitleThankYou = document.createElement("h1");
modalTitleThankYou.classList.add("title__thankyou");
const modalLinkBack = document.createElement("a");
modalLinkBack.classList.add("modal__linkback");
const date = /* @__PURE__ */ new Date();
const currentDate = date.toISOString().substring(0, 10);
const nextYear = new Date(
  date.getFullYear(),
  date.getMonth() + 12,
  date.getDate()
);
const withinNextYear = nextYear.toISOString().substring(0, 10);
function displayModalStepOne() {
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
  const modal1title = modalTitle;
  return modal1title;
}
function displayModalStepTwo() {
  modalTitle.textContent = 'Book Room: "' + selectedChallenge.data.title + '" (Step 2)';
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
async function displayModalStepThree() {
  modalBackground.style.display = "block";
  modalContainer2.style.display = "none";
  modalContainer3.style.display = "flex";
  modalTitleThankYou.textContent = "Thank you!";
  modalLinkBack.text = "Close window";
  modalLinkBack.setAttribute("href", "");
  modalContainer3.append(modalTitleThankYou, modalLinkBack);
  modalBackground.append(modalContainer3);
}
async function availableTimes() {
  modalButtonSearch.addEventListener("click", function() {
    let params = new URLSearchParams(url.search);
    let challengeID = selectedChallenge.data.id;
    if (inputDate.value < currentDate || inputDate.value > withinNextYear) {
      errorMsg.textContent = "You must choose a date newer than today and within a year!";
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
async function displayTimesAndParticipants() {
  let newUrl = url;
  const res = await fetch(newUrl);
  const data = await res.json();
  data.slots.forEach((slot) => {
    arrayTimes.push(slot);
    listTimes = document.createElement("option");
    listTimes.innerText = slot;
    selecMenuTime.appendChild(listTimes);
  });
  for (let i = selectedChallenge.data.minParticipants; i <= selectedChallenge.data.maxParticipants; i++) {
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
  modalButtonSubmit.addEventListener("click", function() {
    let challengeID = selectedChallenge.data.id;
    let name = inputName.value.trim();
    let nameOutput = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    let validName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    let emailOutput = inputMail.value.trim();
    let validPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    let phoneOutput = inputPhone.value;
    let dateOutput = inputDate.value;
    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
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
async function sendBookingData(id, name, email, phonenumber, date2, time, participants) {
  const response = await fetch(
    "https://lernia-sjj-assignments.vercel.app/api/booking/reservations",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // Create object from booking data
      body: JSON.stringify({
        challenge: id,
        name,
        email,
        phonenumber,
        date: date2,
        time,
        participants
      })
    }
  );
  const data = await response.json();
  console.log(data);
}
let filter = {
  online: true,
  //online challenges checkbox
  onsite: true,
  //onsite challenges checkbox
  minRating: 1,
  //lowest rating
  maxRating: 5,
  //highest rating
  labels: [],
  //active tags in lowercase
  words: []
  //inputfield words split into strings in lowercase
};
const currentPage$1 = document.body.dataset.page;
if (currentPage$1 === "challenges") {
  let handleStarClick = function(stars, index, isFromStars) {
    const cards = document.querySelectorAll(".challenge");
    const challengeRating = document.querySelectorAll("#ratingID");
    const noMatchError = document.getElementById("noMatchError");
    let foundMatch = false;
    stars.forEach((star) => star.classList.remove("checked"));
    for (let i = 0; i <= index; i++) {
      stars[i].classList.add("checked");
    }
    const rating = index + 1;
    if (isFromStars) {
      if (rating <= filter.maxRating) {
        filter.minRating = rating;
      } else {
        for (let i = filter.maxRating; i <= index; i++) {
          stars[i].classList.remove("checked");
        }
      }
    } else {
      filter.maxRating = rating;
      if (filter.maxRating < filter.minRating) {
        filter.minRating = filter.maxRating;
        fromStars[filter.minRating - 1].click();
      }
    }
    if (rating >= filter.minRating && rating <= filter.maxRating) {
      for (let i = 0; i < cards.length; i++) {
        let card = challengeRating[i].textContent;
        if (!(card >= filter.minRating && card <= filter.maxRating)) {
          cards[i].style.display = "none";
        } else {
          cards[i].style.display = "";
          foundMatch = true;
        }
        if (cards[i].style.display == "none" && foundMatch == false) {
          noMatchError.innerHTML = "No matching challenges";
        } else {
          noMatchError.innerHTML = "";
        }
      }
    }
  }, searchRooms = function() {
    const searchbox = document.querySelector(".filterInputBox input").value.toLowerCase();
    const card = document.querySelectorAll(".challenge");
    const titles = document.querySelectorAll(".challenge h2");
    const descriptions = document.querySelectorAll("#descID");
    const noMatchError = document.getElementById("noMatchError");
    let foundMatch = false;
    for (let i = 0; i < card.length; i++) {
      let title = titles[i].textContent || titles[i].innerHTML;
      let description = descriptions[i].innerHTML || descriptions[i].innerText;
      if (title.toLowerCase().indexOf(searchbox) > -1 || description.toLowerCase().indexOf(searchbox) > -1) {
        card[i].style.display = "";
        foundMatch = true;
      } else {
        card[i].style.display = "none";
      }
    }
    if (foundMatch) {
      noMatchError.innerHTML = "";
    } else {
      noMatchError.innerHTML = "No matching challenges";
    }
  };
  var handleStarClick2 = handleStarClick, searchRooms2 = searchRooms;
  const fromStars = [
    document.querySelector("#fromOne"),
    document.querySelector("#fromTwo"),
    document.querySelector("#fromThree"),
    document.querySelector("#fromFour"),
    document.querySelector("#fromFive")
  ];
  const toStars = [
    document.querySelector("#toOne"),
    document.querySelector("#toTwo"),
    document.querySelector("#toThree"),
    document.querySelector("#toFour"),
    document.querySelector("#toFive")
  ];
  fromStars.forEach((star, index) => {
    star.addEventListener(
      "click",
      () => handleStarClick(fromStars, index, true)
    );
  });
  toStars.forEach((star, index) => {
    star.addEventListener(
      "click",
      () => handleStarClick(toStars, index, false)
    );
  });
  const inputBox = document.querySelector(".filterInputBox input");
  inputBox.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      const text = inputBox.value.toLowerCase();
      inputBox.value = "";
      filter.words = text.split(" ");
    }
  });
  document.getElementById("searchBox").addEventListener("keyup", searchRooms);
}
let selectedChallenge = void 0;
let allChallenges = [];
let spinner = document.querySelectorAll(".spinner");
class Challenge {
  constructor(data) {
    this.data = data;
  }
  // Create Challenge cards in html from Challenge objects
  render() {
    const container = document.createElement("div");
    container.classList.add("challenge");
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img__container");
    container.append(imgContainer);
    const image = document.createElement("img");
    image.src = this.data.image;
    image.classList.add("img__container");
    imgContainer.append(image);
    const titleAndIconDiv = document.createElement("div");
    titleAndIconDiv.classList.add("titleIcon__div");
    const icon = document.createElement("span");
    icon.classList.add("card_icon");
    container.append(icon);
    if (this.data.type == "online") {
      console.log("online");
      icon.innerHTML = '<i class="fa fa-home"></i>';
    } else {
      console.log("onsite");
      icon.innerHTML = '<i class="fa fa-laptop" aria-hidden="true"></i>';
    }
    const titleElement = document.createElement("h2");
    titleElement.textContent = this.data.title;
    container.append(titleElement);
    function createStarRating(rating) {
      const ratingContainer = document.createElement("div");
      ratingContainer.classList.add("star__container");
      const fullStar = '<img class="rating__star" src="media/full_star.png" alt="Full star">';
      const halfStar = '<img class="rating__star" src="media/half_star.png" alt="Half star">';
      const noStar = '<img class="rating__star" src="media/no_star.png" alt="No star">';
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;
      for (let i = 0; i < fullStars; i++) {
        ratingContainer.innerHTML += fullStar;
      }
      if (hasHalfStar) {
        ratingContainer.innerHTML += halfStar;
      }
      const remainingStars = hasHalfStar ? 5 - fullStars - 1 : 5 - fullStars;
      for (let i = 0; i < remainingStars; i++) {
        ratingContainer.innerHTML += noStar;
      }
      return ratingContainer;
    }
    const starRatingElement = document.createElement("div");
    starRatingElement.classList.add("rating__container");
    starRatingElement.appendChild(createStarRating(this.data.rating));
    container.appendChild(starRatingElement);
    const ratingElement = document.createElement("p");
    ratingElement.textContent = this.data.rating;
    container.append(ratingElement);
    ratingElement.setAttribute("id", "ratingID");
    ratingElement.style.display = "none";
    const participantsElement = document.createElement("span");
    participantsElement.textContent = this.data.minParticipants + " - " + this.data.maxParticipants + " participants";
    starRatingElement.appendChild(participantsElement);
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = "Description: " + this.data.description;
    container.append(descriptionElement);
    descriptionElement.setAttribute("id", "descID");
    let labelElement;
    let labelArray = [];
    for (let i = 0; i < this.data.labels.length; i++) {
      labelElement = document.createElement("p");
      labelArray = this.data.labels;
      labelElement.textContent = "Labels: " + labelArray[i];
      labelElement.classList.add("labels");
      labelElement.classList.add("cardLabels");
      labelElement.setAttribute("id", "cardLabels");
      labelElement.style.display = "none";
      container.append(labelElement);
    }
    let typeElement;
    let typeArray = [];
    typeElement = document.createElement("p");
    typeArray = this.data.type;
    typeElement.textContent = "Type: " + typeArray;
    typeElement.classList.add("cardType");
    typeElement.setAttribute("id", "cardType");
    typeElement.style.display = "none";
    container.append(typeElement);
    const button = document.createElement("button");
    button.textContent = "Book this room";
    button.dataset.challengeId = this.data.id;
    container.append(button);
    button.addEventListener("click", function(event) {
      const challengeId = event.currentTarget.dataset.challengeId;
      displayModalStepOne();
      selectedChallenge = allChallenges.find(
        (challenge) => challenge.data.id === parseInt(challengeId)
      );
      const bookRoomTitle = document.querySelector("#modal1__title");
      bookRoomTitle.textContent = 'Book Room: "' + selectedChallenge.data.title + '" (Step 1)';
    });
      window.requestAnimationFrame(() => {
           applyAnimation(container);
    });
      
  function applyAnimation(container) {
          const card = container;
      if (card) {
        card.classList.add('animation_finished_loading'); 
    } else {          
      console.log('.challenge element not found in the given element');
    }
  }
    return container;
  }
}
function displayLoader() {
  spinner.forEach((spin) => {
    spin.style.display = "block";
  });
}
function hideLoader() {
  spinner.forEach((spin) => {
    spin.style.display = "none";
  });
}
class APIadapter {
  async getAllChallenges() {
    displayLoader();
    const url2 = "https://lernia-sjj-assignments.vercel.app/api/challenges";
    const response = await fetch(url2);
    hideLoader();
    const payload = await response.json();
    allChallenges = payload.challenges.map(
      (challengeData) => new Challenge(challengeData)
    );
    return allChallenges;
  }
}
class ChallengeListView {
  async render(container) {
    const api = new APIadapter();
    const challenges = await api.getAllChallenges();
    for (let i = 0; i < challenges.length; i++) {
      const challenge = challenges[i];
      const element = challenge.render();
      container.append(element);
    }
  }
}
class Top3View {
  async render(container) {
    const api = new APIadapter();
    const challenges = await api.getAllChallenges();
    const sorted = challenges.sort(
      (item0, item1) => item1.data.rating - item0.data.rating
    );
    for (let i = 0; i < 3; i++) {
      const challenge = sorted[i];
      const element = challenge.render();
      container.append(element);
    }
  }
}
const currentPage = document.body.dataset.page;
document.querySelector("#modal__bg");
if (currentPage === "challenges") {
  const challengesDiv = document.querySelector(".challenges__container");
  const view = new ChallengeListView();
  view.render(challengesDiv);
} else if (currentPage === "front-page") {
  const topChallengesDiv = document.querySelector(".containerTwo__carousel");
  const viewTop3 = new Top3View();
  viewTop3.render(topChallengesDiv);
}
if (currentPage === "challenges") {
  let showByType = function() {
    const cards = document.querySelectorAll(".challenge");
    const type = document.querySelectorAll(".cardType");
    const noMatchError = document.getElementById("noMatchError");
    let foundMatch = false;
    if (online.checked && !onsite.checked) {
      for (let i = 0; i < cards.length; i++) {
        let card = type[i].textContent;
        if (card.toLowerCase().includes("online")) {
          cards[i].style.display = "";
          foundMatch = true;
        } else {
          cards[i].style.display = "none";
        }
        if (foundMatch) {
          noMatchError.innerHTML = "";
        } else {
          noMatchError.innerHTML = "No matching challenges";
        }
      }
    } else if (onsite.checked && !online.checked) {
      for (let i = 0; i < cards.length; i++) {
        let card = type[i].textContent;
        if (card.toLowerCase().includes("onsite")) {
          cards[i].style.display = "";
          foundMatch = true;
        } else {
          cards[i].style.display = "none";
        }
        if (foundMatch) {
          noMatchError.innerHTML = "";
        } else {
          noMatchError.innerHTML = "No matching challenges";
        }
      }
    } else if (online.checked && onsite.checked) {
      for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        if (card) {
          cards[i].style.display = "";
          foundMatch = true;
        } else {
          cards[i].style.display = "none";
        }
        if (foundMatch) {
          noMatchError.innerHTML = "";
        } else {
          noMatchError.innerHTML = "No matching challenges";
        }
      }
    } else {
      if (!online.checked && !onsite.checked) {
        for (let j = 0; j < cards.length; j++) {
          cards[j].style.display = "none";
          noMatchError.innerHTML = "No matching challenges";
        }
      }
    }
  }, searchTags = function(tag) {
    const tagId = tag.id;
    if (tag.classList.contains("active")) {
      tag.classList.remove("active");
      filter.labels = filter.labels.filter((activeTag) => activeTag !== tagId);
      console.log("Removed tag:", tagId);
      console.log("Current labels:", filter.labels);
    } else {
      tag.classList.add("active");
      filter.labels.push(tagId);
      console.log("Current labels:", filter.labels);
    }
    const card = document.querySelectorAll(".challenge");
    const cardLabels = document.querySelectorAll(".cardLabels");
    document.querySelectorAll(".filterTags label");
    const activeTags = filter.labels;
    const noMatchError = document.getElementById("noMatchError");
    let foundMatch = false;
    for (let i = 0; i < card.length; i++) {
      let challengeLabels = cardLabels[i].innerHTML;
      if (challengeLabels.toLowerCase().indexOf(activeTags) > -1) {
        card[i].style.display = "";
        foundMatch = true;
      } else {
        card[i].style.display = "none";
      }
      if (foundMatch) {
        noMatchError.innerHTML = "";
      } else {
        noMatchError.innerHTML = "No matching challenges";
      }
    }
  };
  var showByType2 = showByType, searchTags2 = searchTags;
  const online = document.querySelector("#online");
  const onsite = document.querySelector("#onsite");
  online.addEventListener("click", showByType);
  onsite.addEventListener("click", showByType);
  const tags = [
    document.querySelector("#web"),
    document.querySelector("#linux"),
    document.querySelector("#cryptography"),
    document.querySelector("#coding"),
    document.querySelector("#ssh"),
    document.querySelector("#ctf"),
    document.querySelector("#hacking"),
    document.querySelector("#bash"),
    document.querySelector("#javascript"),
    document.querySelector("#electronics"),
    document.querySelector("#phreaking")
  ];
  tags.forEach((tag) => {
    tag.addEventListener("click", () => searchTags(tag));
  });
}
document.getElementById("headerButton").addEventListener("click", function() {
  let menuOverlay = document.getElementById("menuOverlay");
  let popinMenu = document.getElementById("popinMenu");
  menuOverlay.style.display = "block";
  popinMenu.style.display = "flex";
  setTimeout(function() {
    popinMenu.style.animation = "grow 0.1s linear";
    popinMenu.style.opacity = 1;
  }, 100);
  setTimeout(function() {
    menuOverlay.style.animation = "fadein 0.3s linear";
    menuOverlay.style.opacity = 1;
  }, 10);
  document.documentElement.style.overflowY = "hidden";
});
document.getElementById("closebtn").addEventListener("click", function() {
  let menuOverlay = document.getElementById("menuOverlay");
  let popinMenu = document.getElementById("popinMenu");
  menuOverlay.style.animation = "";
  popinMenu.style.animation = "";
  menuOverlay.style.opacity = 0;
  popinMenu.style.opacity = 0;
  setTimeout(function() {
    menuOverlay.style.display = "none";
    popinMenu.style.display = "none";
  }, 200);
  document.documentElement.style.overflowY = "auto";
});
