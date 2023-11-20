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

let filter = {
  online: true, //online challenges checkbox
  onsite: true, //onsite challenges checkbox
  minRating: 1, //lowest rating
  maxRating: 5, //highest rating
  labels: [], //active tags in lowercase
  words: [], //inputfield words split into strings in lowercase
};

/*------------------------FILTER VALUES------------------------*/

/*------------------------BY TYPE------------------------*/

// Get all the types
const online = document.querySelector("#online");
const onsite = document.querySelector("#onsite");

// Functions to handle type click
online.addEventListener("click", function () {
  if (filter.online == true) {
    filter.online = false;
  } else {
    filter.online = true;
  }
});

onsite.addEventListener("click", function () {
  if (filter.onsite == true) {
    filter.onsite = false;
  } else {
    filter.onsite = true;
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

// Add event listeners to all stars
fromStars.forEach((star, index) => {
  star.addEventListener("click", () => handleStarClick(fromStars, index, true));
});

toStars.forEach((star, index) => {
  star.addEventListener("click", () => handleStarClick(toStars, index, false));
});

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
    // Only update minRating if it's less than or equal to maxRating
    if (rating <= filter.maxRating) {
      filter.minRating = rating;
    } else {
      // If minRating would be greater than maxRating, remove 'checked' class from the stars that should not be selected
      for (let i = filter.maxRating; i <= index; i++) {
        stars[i].classList.remove("checked");
      }
    }
  } else {
    filter.maxRating = rating;
  }
}

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
tags.forEach((tag) => {
  tag.addEventListener("click", () => handleTagClick(tag));
});

function handleTagClick(tag) {
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
  } else {
    // If the clicked tag does not have the 'active' class, add it
    tag.classList.add("active");
    // And add the tag's id to the filter.labels array
    filter.labels.push(tagId);
    // Log a message indicating that the tag was added
    console.log("Added tag:", tagId);
  }

  // Log the current state of the filter.labels array
  //console.log('Current labels:', filter.labels);
}

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
    filter.words = text.split(" ");

    // Log the words array
    //console.log(filter.words);
  }
});

/*------------------------INPUT FIELD------------------------*/

/*------------------------FILTER FUNCTIONALITY---------------*/

// Endast de rum med aktiverade ettiketter ska visas när en användare har tryckt på en tag tex linux activeTags
/*activeTags array få ut rum och visa*/
/*
function filterActiveTags(activeTags){
if( )
}*/

// Användare kan skriva in keywords i input  och sidan ska uppdateras medan man skriver så att den bara visar rum med titel eller besrkivning som innehåller sökorden som användare skrivit i

// om description stämmer med keyword eller Title så ska rummet visas
/*
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
