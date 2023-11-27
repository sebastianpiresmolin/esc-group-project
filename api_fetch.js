import { availableTimes, displayModalStepOne } from "./book.js";
export let selectedChallenge = undefined;

// Define Challenge class, used in APIadapter
export default class Challenge {
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

    // Create Book room button for each Challenge card
    const button = document.createElement("button");
    button.textContent = "Book this room";
    button.dataset.challengeId = this.data.id;
    container.append(button);

    // Listen to button and forward challenge id to show title in booking modal
    button.addEventListener("click", function (event) {
      const challengeId = event.currentTarget.dataset.challengeId;
      console.log("Challenge id:", challengeId);
      //document.getElementsByClassName("modal__stepOne")[0].style.display = "block";
      displayModalStepOne(modal1);

      selectedChallenge = allChallenges.find(
        (challenge) => challenge.data.id === parseInt(challengeId)
      );

      const bookRoomTitle = document.querySelector("#modal1__title");
      bookRoomTitle.textContent =
        'Book Room: "' + selectedChallenge.data.title + '" (Step 1)';
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
let allChallenges = [];

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
const modal1 = document.querySelector("#modal__bg");

const view = new ChallengeListView();
view.render(challengesDiv);

class BookingForm {}

// Filter Challenges by Type, onsite or online

// Filter Challenges by Rating

// Filter Challenges by Tags

// Filter Challenges by Free text search
