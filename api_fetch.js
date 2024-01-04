import { availableTimes, displayModalStepOne } from "./book.js";
import { filter } from "./filter.js";
export let selectedChallenge = undefined;

//Global array to hold Challenge objects
let allChallenges = [];
//Get the spinner
let spinner = document.querySelectorAll(".spinner");

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
    //container.append(titleAndIconDiv);
    //titleAndIconDiv.append(titleElement);
    //titleAndIconDiv.append(icon);
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
    ratingElement.textContent = this.data.rating;
    container.append(ratingElement);
    ratingElement.setAttribute("id", "ratingID");
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
      labelElement.classList.add("labels");
      labelElement.classList.add("cardLabels");
      labelElement.setAttribute("id", "cardLabels");
      //Hides(removes) the label elements, does not take up place
      labelElement.style.display = "none";
      container.append(labelElement);
    }

    //Create type element to target later in function
    let typeElement;
    let typeArray = [];

    typeElement = document.createElement("p");
    typeArray = this.data.type;
    typeElement.textContent = "Type: " + typeArray;
    typeElement.classList.add("cardType");
    typeElement.setAttribute("id", "cardType");
    //Hides(removes) the label elements, does not take up place
    typeElement.style.display = "none";
    container.append(typeElement);

    // Create Book room button for each Challenge card
    const button = document.createElement("button");
    button.textContent = "Book this room";
    button.dataset.challengeId = this.data.id;
    container.append(button);

    // Listen to button and forward challenge id to show title in booking modal
    button.addEventListener("click", function (event) {
      const challengeId = event.currentTarget.dataset.challengeId;

      displayModalStepOne(modal1);

      selectedChallenge = allChallenges.find(
        (challenge) => challenge.data.id === parseInt(challengeId)
      );

      const bookRoomTitle = document.querySelector("#modal1__title");
      bookRoomTitle.textContent =
        'Book Room: "' + selectedChallenge.data.title + '" (Step 1)';
    });
    //  Working the function with "window." after the API has finished loading
    window.requestAnimationFrame(() => {
      // Calling the function with the chellenges container
      applyAnimation(container);
    });
    
    // Applying animation to the provided container  
  function applyAnimation(container) {
          const card = container;
    // Checking if the card (container) exists
    if (card) {
       // Adding the 'animation_class' CSS class to trigger the animation
      card.classList.add('animation_finished_loading'); 
    } else {          
      console.log('.challenge element not found in the given element');
    }
  }
    
    return container;
  }
}

//Show and hide the loading spinner
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

// Request Challenge data from API and Create Challenge objects and put them in allChallenges array
class APIadapter {
  async getAllChallenges() {
    displayLoader();
    const url = "https://lernia-sjj-assignments.vercel.app/api/challenges";
    const response = await fetch(url);
    hideLoader();
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

// Look for which page is showing and render all challenges or top3
const currentPage = document.body.dataset.page;
const modal1 = document.querySelector("#modal__bg");

if (currentPage === "challenges") {
  // Show All Challenge cards on Challenges page
  const challengesDiv = document.querySelector(".challenges__container");
  const view = new ChallengeListView();
  view.render(challengesDiv);
} else if (currentPage === "front-page") {
  // Show Top3 Challenges on front page
  const topChallengesDiv = document.querySelector(".containerTwo__carousel");
  const viewTop3 = new Top3View();
  viewTop3.render(topChallengesDiv);
}

if (currentPage === "challenges") {
  //------ Filter Challenges by Type, onsite or online ------
  // Get all the types
  const online = document.querySelector("#online");
  const onsite = document.querySelector("#onsite");
  // event listener for online/onsite button
  online.addEventListener("click", showByType);
  onsite.addEventListener("click", showByType);
  // FUNCTION TO HANDLE FILTERBYTYPE CLICK
  function showByType() {
    //Get all the cards (challenge elements)
    const cards = document.querySelectorAll(".challenge");
    const type = document.querySelectorAll(".cardType");
    //Get the noMatchError element
    const noMatchError = document.getElementById("noMatchError");
    // Initialize a variable to track whether a match is found
    let foundMatch = false;
    //works if online is checked and onsite not checked
    if (online.checked && !onsite.checked) {
      for (let i = 0; i < cards.length; i++) {
        let card = type[i].textContent;
        if (card.toLowerCase().includes("online")) {
          // Show the current challenge element
          cards[i].style.display = "";

          // Set foundMatch to true since a match was found
          foundMatch = true;
        } else {
          // Hide the current challenge element if it doesn't match the search box value
          cards[i].style.display = "none";
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
      //works if onsite is checked and online not checked
    } else if (onsite.checked && !online.checked) {
      for (let i = 0; i < cards.length; i++) {
        let card = type[i].textContent;
        if (card.toLowerCase().includes("onsite")) {
          // Show the current challenge element
          cards[i].style.display = "";

          // Set foundMatch to true since a match was found
          foundMatch = true;
        } else {
          // Hide the current challenge element if it doesn't match the search box value
          cards[i].style.display = "none";
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
      //works if both are checked
    } else if (online.checked && onsite.checked) {
      for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        if (card) {
          // Show the current challenge element
          cards[i].style.display = "";
          // Set foundMatch to true since a match was found
          foundMatch = true;
        } else {
          // Hide the current challenge element if it doesn't match the search box value
          cards[i].style.display = "none";
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
      // if both are unchecked show error message
    } else {
      if (!online.checked && !onsite.checked) {
        for (let j = 0; j < cards.length; j++) {
          //hide all the cards
          cards[j].style.display = "none";
          //set the error message
          noMatchError.innerHTML = "No matching challenges";
        }
      }
    }
  }

  // ------ Filter Challenges by Rating ------

  // Filter Challenges by Tags

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
}
