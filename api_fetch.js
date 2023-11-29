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
        participantsElement.textContent = this.data.minParticipants + " - " + this.data.maxParticipants + " participants";
        container.append(participantsElement);

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = "Description: " + this.data.description;
        container.append(descriptionElement);
        descriptionElement.setAttribute("id", "descID"); 

        // Create Book room button for each Challenge card
        const button = document.createElement("button");
        button.textContent = "Book this room";
        button.dataset.challengeId = this.data.id;
        container.append(button);

        // Listen to button and forward challenge id to show title in booking modal
        button.addEventListener("click", function (event) {
            const challengeId = event.currentTarget.dataset.challengeId;
            console.log("Challenge id:", challengeId);
            document.getElementsByClassName("modal__stepOne")[0].style.display = "block";

            const selectedChallenge = allChallenges.find(challenge => challenge.data.id === parseInt(challengeId));

            const bookRoomTitle = document.createElement("h1");
            bookRoomTitle.textContent = "Book Room: \"" + selectedChallenge.data.title + "\" (Step 1)";

            const modalStepOne = document.querySelector("#challenge__title");
            modalStepOne.append(bookRoomTitle);


        });


        return container;
    }
}


// Request Challenge data from API and Create Challenge objects and put them in allChallenges array
class APIadapter {
    async getAllChallenges() {
        const url = 'https://lernia-sjj-assignments.vercel.app/api/challenges';
        const response = await fetch(url);
        const payload = await response.json();

        allChallenges = payload.challenges.map((challengeData) => new Challenge(challengeData));

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
const challengesDiv = document.querySelector('#challenges__container');

const view = new ChallengeListView();
view.render(challengesDiv);




// Filter Challenges by Type, onsite or online





// Filter Challenges by Rating





// Filter Challenges by Tags
import {filter} from './filter.js';

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
    console.log('Current labels:', filter.labels);
  }


 //Collecting tags from the challenge cards and putting them in allTagsArray
 async function fetchAllTags() {
    for (let i = 0; i < allChallenges.length; i++) {
        const lable = allChallenges[i].labels
        lable.forEach(lable => {
            if (!allTagsArray.includes(lable)) {
                allTagsArray.push(lable)      }
        })
    }
  }
      //Use filter() to filter out the labels - https://www.freecodecamp.org/news/filter-arrays-in-javascript/
    

      //allTagsArray är kortens labels sparade i array
      //filter.labels är aktiva labels från filtret





 
    