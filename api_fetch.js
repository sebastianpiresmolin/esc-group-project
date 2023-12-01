import { availableTimes, displayModalStepOne } from "./book.js";
export let selectedChallenge = undefined;
let allChallenges = [];

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

    const image = document.createElement("img");
    image.src = this.data.image;
    image.classList.add("img__container");
    imgContainer.append(image);

    const titleElement = document.createElement("h2");
    titleElement.textContent = this.data.title + " (" + this.data.type + ")";
    container.append(titleElement);

    // Function to convert rating to stars
    function createStarRating(rating) {
      const ratingContainer = document.createElement("div");
      ratingContainer.classList.add("star__container");

      const fullStar =
        '<img class="rating__star" src="media/full_star.png" alt="Full star">';
      const halfStar =
        '<img class="rating__star" src="media/half_star.png" alt="Half star">';
      const noStar =
        '<img class="rating__star" src="media/no_star.png" alt="No star">';

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

    // Rating value, hidden on page
    const ratingElement = document.createElement("p");
    ratingElement.textContent = "Rating: " + this.data.rating;
    container.append(ratingElement);
    ratingElement.style.display = "none";

    const participantsElement = document.createElement("span");
    participantsElement.textContent =
      this.data.minParticipants +
      " - " +
      this.data.maxParticipants +
      " participants";
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
const challengesDiv = document.querySelector(".challenges__container");
const modal1 = document.querySelector("#modal__bg");

const view = new ChallengeListView();
view.render(challengesDiv);

// Filter out the top3 challenges by rating
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

// Show Top3 Challenges on front page
const topChallengesDiv = document.querySelector(".containerTwo__carousel");

const viewTop3 = new Top3View();
viewTop3.render(topChallengesDiv);

// Filter Challenges by Type, onsite or online

// Filter Challenges by Rating

// Filter Challenges by Tags

// Filter Challenges by Free text search
