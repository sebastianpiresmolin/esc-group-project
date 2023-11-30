// Define Challenge class, used in APIadapter
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

    /* Correct image from api, warning! Crazy cat image! :) Used hero image for each card for now
        /*
        const image = document.createElement('img');
        image.src = this.data.image;
        image.classList.add("img__container");
        imgContainer.append(image);
        */

    const titleElement = document.createElement("h2");
    titleElement.textContent = this.data.title + " (" + this.data.type + ")";
    container.append(titleElement);

    const ratingElement = document.createElement("p");
    ratingElement.textContent = "Rating: " + this.data.rating;
    container.append(ratingElement);

    const participantsElement = document.createElement("p");
    participantsElement.textContent =
      this.data.minParticipants +
      " - " +
      this.data.maxParticipants +
      " participants";
    container.append(participantsElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = "Description: " + this.data.description;
    container.append(descriptionElement);
    descriptionElement.setAttribute("id", "descID");

    //Create label element to target later in function
    let labelElement;
    let labelArray = [];
    for (let i = 0; i < this.data.labels.length; i++) {
      labelElement = document.createElement("p");
      labelArray = this.data.labels;
      labelElement.textContent = "Labels: " + labelArray[i];
      labelElement.classList.add("cardLabels");
      labelElement.setAttribute("id", "cardLabels");
      //Hides(removes) the label elements, does not take up place
      labelElement.style.display = "none";
      container.append(labelElement);
    }

    // Create Book room button for each Challenge card
    const button = document.createElement("button");
    button.textContent = "Book this room";
    button.dataset.challengeId = this.data.id;
    container.append(button);

    // Listen to button and forward challenge id to show title in booking modal
    button.addEventListener("click", function (event) {
      const challengeId = event.currentTarget.dataset.challengeId;
      console.log("Challenge id:", challengeId);
      document.getElementsByClassName("modal__stepOne")[0].style.display =
        "block";

      const selectedChallenge = allChallenges.find(
        (challenge) => challenge.data.id === parseInt(challengeId)
      );

      const bookRoomTitle = document.createElement("h1");
      bookRoomTitle.textContent =
        'Book Room: "' + selectedChallenge.data.title + '" (Step 1)';

      const modalStepOne = document.querySelector("#challenge__title");
      modalStepOne.append(bookRoomTitle);
    });

    return container;
  }
}

// Request Challenge data from API and Create Challenge objects and put them in allChallenges array
class APIadapter {
  async getAllChallenges() {
    const url = "https://lernia-sjj-assignments.vercel.app/api/challenges";
    const response = await fetch(url);
    const payload = await response.json();

    allChallenges = payload.challenges.map(
      (challengeData) => new Challenge(challengeData)
    );

    return allChallenges;
  }
}

//Global array to hold Challenge objects
export let allChallenges = [];

// Loop through array to create all Challenge cards
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

// Show All Challenge cards on Challenges page
const challengesDiv = document.querySelector("#challenges__container");

const view = new ChallengeListView();
view.render(challengesDiv);

//------ Filter Challenges by Type, onsite or online ------
// Get all the types
const online = document.querySelector("#online");
const onsite = document.querySelector("#onsite");
// event listener for online/onsite button
online.addEventListener("click", showByType);
onsite.addEventListener("click", showByType);
// Function to handle filterByType click
function showByType() {
  //Get all the cards (challenge elements)
  const cards = document.querySelectorAll(".challenge");
  const titles = document.querySelectorAll(".challenge h2");
  //Get the noMatchError element
  const noMatchError = document.getElementById("noMatchError");
  // Initialize a variable to track whether a match is found
  let foundMatch = false;
  //works if online is checked and onsite not checked
  if (online.checked && !onsite.checked) {
    for (let i = 0; i < cards.length; i++) {
      let card = titles[i].textContent;
      if (card.toLowerCase().includes("online")) {
        // Show the current challenge element
        cards[i].style.display = "";

        // Set foundMatch to true since a match was found
        foundMatch = true;
      } else {
        // Hide the current challenge element if it doesn't match the search box value
        cards[i].style.display = "none";
      }
    }
    //works if onsite is checked and online not checked
  } else if (onsite.checked && !online.checked) {
    for (let i = 0; i < cards.length; i++) {
      let card = titles[i].textContent;
      if (card.toLowerCase().includes("onsite")) {
        // Show the current challenge element
        cards[i].style.display = "";

        // Set foundMatch to true since a match was found
        foundMatch = true;
      } else {
        // Hide the current challenge element if it doesn't match the search box value
        cards[i].style.display = "none";
      }
    }
    //works if both are checked
  } else if (online.checked && onsite.checked) {
    for (let i = 0; cards.length; i++) {
      let card = titles[i].textContent;
      if (card) {
        // Show the current challenge element
        cards[i].style.display = "";
        // Set foundMatch to true since a match was found
        foundMatch = true;
      } else {
        // Hide the current challenge element if it doesn't match the search box value
        cards[i].style.display = "none";
      }
    }
  } else {
    for (let j = 0; j < cards.length; j++) {
      return foundMatch = false;
    }
  }
  // If a match was found
  if (foundMatch) {
    // Clear the error message
    noMatchError.innerHTML = "";
  } else {
    // If no matches were found, set the error message
    noMatchError.innerHTML = "No matching challenges";
  }
}

// ------ Filter Challenges by Rating ------

// Filter Challenges by Tags
import { filter } from "./filter.js";

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
  document.querySelector("#phreaking"),
];

// Add event listeners to all tags
tags.forEach((tag) => {
  tag.addEventListener("click", () => searchTags(tag));
});

function searchTags(tag) {
  // Get the id of the clicked tag
  const tagId = tag.id;

  // Check if the clicked tag has the 'active' class
  if (tag.classList.contains("active")) {
    // If it does, remove the 'active' class
    tag.classList.remove("active");
    // And remove the tag's id from the filter.labels array
    filter.labels = filter.labels.filter((activeTag) => activeTag !== tagId);
    // Log a message indicating that the tag was removed
    console.log("Removed tag:", tagId);
    //Log the current state of the filter.labels array
    console.log("Current labels:", filter.labels);
  } else {
    // If the clicked tag does not have the 'active' class, add it
    tag.classList.add("active");
    // And add the tag's id to the filter.labels array
    filter.labels.push(tagId);
    //Log the current state of the filter.labels array
    console.log("Current labels:", filter.labels);
  }

  // Labels in cards has id and class cardLabels

  //Get all the cards (challenge elements)
  const card = document.querySelectorAll(".challenge");

  //Get all the label elements within the challenge elements
  const cardLabels = document.querySelectorAll(".cardLabels");

  //Get all the labels/tags from the filter
  const filterLabels = document.querySelectorAll(".filterTags label");

  //Get active tags from array
  const activeTags = filter.labels;

  //Get the noMatchError element
  const noMatchError = document.getElementById("noMatchError");

  // Initialize a variable to track whether a match is found
  let foundMatch = false;

  // Loop through all the cards (challenge elements)
  for (let i = 0; i < card.length; i++) {
    // Get the text content from the cardLabels within the current challenge element
    let challengeLabels = cardLabels[i].innerHTML;

    //If the current cardLabel includes the activeTags value
    if (challengeLabels.toLowerCase().indexOf(activeTags) > -1) {
      // Show the current challenge element
      card[i].style.display = "";

      // Set foundMatch to true since a match was found
      foundMatch = true;
    } else {
      // Hide the current challenge element if it doesn't match the search box value
      card[i].style.display = "none";
    }

    // If a match was found
    if (foundMatch) {
      // Clear the error message
      noMatchError.innerHTML = "";
    } else {
      // If no matches were found, set the error message
      noMatchError.innerHTML = "No matching challenges";
    }
  }
}
