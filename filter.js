/*------------------------FILTER VALUES------------------------*/

export let filter = {
  online: true, //online challenges checkbox
  onsite: true, //onsite challenges checkbox
  minRating: 1, //lowest rating
  maxRating: 5, //highest rating
  labels: [], //active tags in lowercase
  words: [], //inputfield words split into strings in lowercase
};

/*------------------------FILTER VALUES------------------------*/

/*------------------------BY TYPE------------------------*/

/*------------------------BY TYPE------------------------*/

/*------------------------STAR RATING------------------------*/

// Variable to hold current page value, index or challenges
const currentPage = document.body.dataset.page;

if (currentPage === "challenges") {
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
    star.addEventListener("click", () =>
      handleStarClick(fromStars, index, true)
    );
  });

  toStars.forEach((star, index) => {
    star.addEventListener("click", () =>
      handleStarClick(toStars, index, false)
    );
  });

  // Function to handle star click
  function handleStarClick(stars, index, isFromStars) {
    const cards = document.querySelectorAll(".challenge");
    const challengeRating = document.querySelector("#ratingID");
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
      // If maxRating is decreased, adjust minRating to be equal to maxRating
      if (filter.maxRating < filter.minRating) {
        filter.minRating = filter.maxRating;
        // Trigger click event on corresponding minRating star
        fromStars[filter.minRating - 1].click();
      }
    }
    if (rating >= filter.minRating && rating <= filter.maxRating) {
      console.log(challengeRating);
      for (let i = 0; i < cards.length; i++) {
        let card = challengeRating[i];
        console.log(card);
      }
    }
  }
  /*------------------------STAR RATING------------------------*/

  /*------------------------TAGS------------------------*/

  // Moved filter by TAGS to api_fetch.js

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

  //Add an eventlistener to the searchbox that triggers the searchRooms function on keyup
  document.getElementById("searchBox").addEventListener("keyup", searchRooms);

  //Define the searchRooms function
  function searchRooms() {
    //Get the value of the search box, convert it to lowercase
    const searchbox = document
      .querySelector(".filterInputBox input")
      .value.toLowerCase();

    //Get all the challenge elements
    const card = document.querySelectorAll(".challenge");

    //Get all the h2 elements within the challenge elements
    const titles = document.querySelectorAll(".challenge h2");

    //Get all the elements with id "descID" within the challenge elements
    const descriptions = document.querySelectorAll("#descID");

    //Get the noMatchError element
    const noMatchError = document.getElementById("noMatchError");

    // Initialize a variable to track whether a match is found
    let foundMatch = false;

    // Loop through all the challenge elements
    for (let i = 0; i < card.length; i++) {
      // Get the text content of the h2 element within the current challenge element
      let title = titles[i].textContent || titles[i].innerHTML;

      // Get the text content of the description element within the current challenge element
      let description = descriptions[i].innerHTML || descriptions[i].innerText;

      //If the title or description includes the search box value
      if (
        title.toLowerCase().indexOf(searchbox) > -1 ||
        description.toLowerCase().indexOf(searchbox) > -1
      ) {
        // Show the current challenge element
        card[i].style.display = "";

        // Set foundMatch to true since a match was found
        foundMatch = true;
      } else {
        // Hide the current challenge element if it doesn't match the search box value
        card[i].style.display = "none";
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
}
/*------------------------INPUT FIELD------------------------*/
