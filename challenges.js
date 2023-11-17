/* ------------------------MOBILE MENU------------------------ */
//aa
document.getElementById("headerButton").addEventListener("click", function () {
  let menuOverlay = document.getElementById("menuOverlay");
  let popinMenu = document.getElementById("popinMenu");

  menuOverlay.style.display = "block"; // This shows my white overlay
  popinMenu.style.display = "flex"; // This shows my popin menu

  setTimeout(function () {
    popinMenu.style.animation = "grow 0.1s linear";
    popinMenu.style.opacity = 1;
  }, 100);

  setTimeout(function () {
    menuOverlay.style.animation = "fadein 0.3s linear";
    menuOverlay.style.opacity = 1;
  }, 10);

  document.documentElement.style.overflowY = "hidden"; // This disables the ability to scroll behind the menu
});

document.getElementById("closebtn").addEventListener("click", function () {
  let menuOverlay = document.getElementById("menuOverlay");
  let popinMenu = document.getElementById("popinMenu");

  menuOverlay.style.animation = ""; // This resets the animation between each use.
  popinMenu.style.animation = ""; // Otherwise its buggy until the page refreshes.

  menuOverlay.style.opacity = 0;
  popinMenu.style.opacity = 0;

  setTimeout(function () {
    menuOverlay.style.display = "none"; // This hides my white overlay
    popinMenu.style.display = "none"; // This hides my popin menu
  }, 200);

  document.documentElement.style.overflowY = "auto"; // This enables the ability to scroll again
});

let filterButton = document.getElementById("filterButton");
let filterWindow = document.getElementById("filterWindow");
document.getElementById("closeFilter").addEventListener("click", function () {
  filterWindow.style.display = "none";
  filterButton.style.display = "block";
});

document.getElementById("filterButton").addEventListener("click", function () {
  
  setTimeout(function () {
    filterWindow.style.animation = "grow 0.1s ease";
    filterWindow.style.opacity = 1;
    filterWindow.style.display = "flex";
    filterButton.style.display = "none";
  }, 10);
});

/*------------------------MOBILE MENU------------------------*/

/*------------------------FILTER VALUES------------------------*/

// THE DEFAULT VALUES ARE IMPORTANT SO THAT THE FILTERS WORK PROPERLY
let onlineChallenges = true; //online challenges checkbox
let onsiteChallenges = true; //onsite challenges checkbox
let fromRating = 1; //lowest rating
let toRating = 5; //highest rating
let activeTags = []; //active tags in lowercase without #
let words = []; //inputfield words split into strings in lowercase

/*------------------------FILTER VALUES------------------------*/

/*------------------------BY TYPE------------------------*/

// Get all the types
const online = document.querySelector("#online");
const onsite = document.querySelector("#onsite");

// Functions to handle type click
online.addEventListener("click", function () {
  if (onlineChallenges == true) {
    onlineChallenges = false;
  } else {
    onlineChallenges = true;
  }
});

onsite.addEventListener("click", function () {
  if (onsiteChallenges == true) {
    onsiteChallenges = false;
  } else {
    onsiteChallenges = true;
  }
});

/*------------------------BY TYPE------------------------*/

/*------------------------STAR RATING------------------------*/

// Get all the stars
const fromStars = [
  document.querySelector("#fromOne"),
  document.querySelector("#fromTwo"),
  document.querySelector("#fromThree"),
  document.querySelector("#fromFour"),
  document.querySelector("#fromFive"),
];

const toStars = [
  document.querySelector("#toOne"),
  document.querySelector("#toTwo"),
  document.querySelector("#toThree"),
  document.querySelector("#toFour"),
  document.querySelector("#toFive"),
];

// Function to handle star click
function handleStarClick(stars, index, isFromStars) {
  // Remove 'checked' class from all stars
  stars.forEach((star) => star.classList.remove("checked"));

  // Add 'checked' class to clicked star and all previous stars
  for (let i = 0; i <= index; i++) {
    stars[i].classList.add("checked");
  }

  // Update the rating
  const rating = index + 1;
  if (isFromStars) {
    // Only update fromRating if it's less than or equal to toRating
    if (rating <= toRating) {
      fromRating = rating;
    } else {
      // If fromRating would be greater than toRating, remove 'checked' class from the stars that should not be selected
      for (let i = toRating; i <= index; i++) {
        stars[i].classList.remove("checked");
      }
    }
  } else {
    toRating = rating;
  }
}

// Add event listeners to all stars
fromStars.forEach((star, index) => {
  star.addEventListener("click", () => handleStarClick(fromStars, index, true));
});

toStars.forEach((star, index) => {
  star.addEventListener("click", () => handleStarClick(toStars, index, false));
});

/*------------------------STAR RATING------------------------*/

/*------------------------TAGS------------------------*/

// Get all the tags

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
tags.forEach(tag => {
  tag.addEventListener('click', () => handleTagClick(tag));
});

// Function to handle tag click
function handleTagClick(tag) {
  const tagId = tag.id; // Get the id of the tag

  // Check if the tag is already active
  if (tag.classList.contains("active")) {
    // If it's active, remove the 'active' class and remove it from the activeTags array
    tag.classList.remove("active");
    activeTags = activeTags.filter((activeTag) => activeTag !== tagId);
  } else {
    // If it's not active, add the 'active' class and add it to the activeTags array
    tag.classList.add("active");
    activeTags.push(tagId);
  }

  // Log the activeTags array
  //console.log(activeTags);
}


// Add event listeners to all tags
tags.forEach((tag) => {
  tag.addEventListener("click", () => handleTagClick(tag));
});

/*------------------------TAGS------------------------*/

/*------------------------INPUT FIELD------------------------*/

const inputBox = document.querySelector(".filterInputBox input");

// Add the event listener
inputBox.addEventListener("keyup", function (event) {
  // Check if the key pressed was 'Enter'
  if (event.key === "Enter") {
    // Get the value of the input box
    const text = inputBox.value.toLowerCase();

    // Clear the input box
    inputBox.value = "";

    // Split the text into words and save it in the array
    words = text.split(" ");

    // Log the words array
    //console.log(words);
  }
});

/*------------------------INPUT FIELD------------------------*/

/*------------------------FETCH DATA FROM API----------------*/

class Challenge {
  constructor(id, type, title, description, minParticipants, maxParticipants, rating, image, labels) {
      this.id = id;
      this.type = type;
      this.title = title;
      this.description = description;
      this.minParticipants = minParticipants;
      this.maxParticipants = maxParticipants;
      this.rating = rating;
      this.image = image;
      this.labels = labels;
  }
}

let challenges = [];

async function fetchChallengeData() {
  const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
  const data = await res.json();
  const challengesData = data.challenges;
  challenges = challengesData.map(challengeData => {
      return new Challenge(
          challengeData.id,
          challengeData.type,
          challengeData.title,
          challengeData.description,
          challengeData.minParticipants,
          challengeData.maxParticipants,
          challengeData.rating,
          challengeData.image,
          challengeData.labels
      )
  });
  return challenges;
}

/*------------------------FETCH DATA FROM API----------------*/

/*------------------------FILTER FUNCTIONALITY---------------*/

// Endast de rum med aktiverade ettiketter ska visas när en användare har tryckt på en tag tex linux activeTags
/*activeTags array få ut rum och visa*/
function filterActiveTags(activeTags){
if( )
}



// Användare kan skriva in keywords i input  och sidan ska uppdateras medan man skriver så att den bara visar rum med titel eller besrkivning som innehåller sökorden som användare skrivit i

// om description stämmer med keyword eller Title så ska rummet visas
function filterKeywords() {
  if(inputBox.value == challengeData.description || inputBox.value == challengeData.title){
    //Börja visa rum när input stämmer övereens med första bokstäverna
    // Visa rum under filterbox
  }
  else{
    // Visa meddelande under "No matching challenges"
  }

}


/*------------------------FILTER FUNCTIONALITY---------------*/

