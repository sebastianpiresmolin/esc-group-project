/*------------------------FILTER VALUES------------------------*/

let filter = {
    online: true, //online challenges checkbox
    onsite: true, //onsite challenges checkbox
    minRating: 1, //lowest rating
    maxRating: 5, //highest rating
    labels: [], //active tags in lowercase
    words: [], //inputfield words split into strings in lowercase
  };

  export default filter;
  
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
      // If maxRating is decreased, adjust minRating to be equal to maxRating
      if (filter.maxRating < filter.minRating) {
        filter.minRating = filter.maxRating;
        // Trigger click event on corresponding minRating star
        fromStars[filter.minRating - 1].click();
      }
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
    }
  
    //Log the current state of the filter.labels array
    //console.log('Current labels:', filter.labels);
  
        /*
    //Get all the challenge elements
    const card = document.querySelectorAll(".challenge");

    //Get all the tags within the challenge elements
    const challengeTags = document.querySelectorAll("allChallenges");

    //Get the noMatchError element
    const noMatchError = document.getElementById("noMatchError");

    // Initialize a variable to track whether a match is found
    let foundMatch = false;

    // saves the active labels array into a variable
    const activeTags = filter.labels;
   

    // Loop through all the challenge elements
    for (let i = 0; i < card.length; i++) {
      // Get the tag in the current challenge element
      let cardTag = allChallenges[i].tags;

      //If the tag inside the challenge card includes the active tag value
      if (cardTag.toLowerCase().indexOf(activeTags) > -1 ) {
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
*/
  //Endast rum med aktiva tags ska visas - finns i array filter.labels
 //challenge.tags (tagsen som är på korten)
 

 
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
  const searchbox = document.querySelector(".filterInputBox input").value.toLowerCase();

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
    if (title.toLowerCase().indexOf(searchbox) > -1 || description.toLowerCase().indexOf(searchbox) > -1) {
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

  /*------------------------INPUT FIELD------------------------*/