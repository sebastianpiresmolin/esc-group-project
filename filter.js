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
  }

  //Endast rum med aktiva tags ska visas
  
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

//Searching for challenges titles that matches the keyword
document.getElementById("searchBox").addEventListener("keyup", searchRoomByKeyW, searchRoomByDesc);

function searchRoomByKeyW() {
  const searchbox = document.querySelector(".filterInputBox input").value.toLowerCase();
  const product = document.querySelectorAll(".challenge");
  const pname = document.querySelectorAll(".challenge h2");
  const noMatchError = document.getElementById("noMatchError");

  let foundMatch = false;

  for (let i = 0; i < pname.length; i++) {
    let match = product[i].getElementsByTagName("h2")[0];
    // If the h2 element exists
    if (match) {
      // Get the text content of the h2 element
      let textvalue = match.textContent || match.innerHTML;
      // If the text content includes the search box value
      if (textvalue.toLowerCase().indexOf(searchbox) > -1) {
        product[i].style.display = "";// Show the current challenge element
        foundMatch = true;// Set foundMatch to true since a match was found
      } else {
        product[i].style.display = "none";// Hide the current challenge element if it doesn't match the search box value
      }
    }
  }

  if (foundMatch) {
    noMatchError.innerHTML = ""; // Clear the error message if a match is found
  } else {
    noMatchError.innerHTML = "No matching challenges"; // Show the error message if no matches are found
  }
}

//Add Search by description p
function searchRoomByDesc() {
  const searchbox = document.querySelector(".filterInputBox input").value.toLowerCase();
  const product = document.querySelectorAll(".challenge");
  const pname = document.querySelectorAll("#descID");
  const noMatchError = document.getElementById("noMatchError");

  let foundMatch = false;

  for (let i = 0; i < pname.length; i++) {
  let match = product[i].querySelector("#descID")[0];
  // If the #descID element exists
  if (match) {
    // Get the text content of the description element element
    let textvalue = match.innerHTML || match.innerText ;
    // If the text content includes the search box value
    if (textvalue.toLowerCase().indexOf(searchbox) > -1) {
      product[i].style.display = "";// Show the current challenge element
      foundMatch = true;// Set foundMatch to true since a match was found
    } else {
      product[i].style.display = "none";// Hide the current challenge element if it doesn't match the search box value
    }
  }
}

  if (foundMatch) {
    noMatchError.innerHTML = ""; // Clear the error message if a match is found
  } else {
    noMatchError.innerHTML = "No matching challenges"; // Show the error message if no matches are found
  }
}




  /*------------------------INPUT FIELD------------------------*/