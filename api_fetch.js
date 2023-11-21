// Create Challenges as objects
class Challenge {
    constructor(data) {
        this.data = data;

    }
    render() {
        const container = document.createElement("div");
        container.classList.add("challenge");

        const imgContainer = document.createElement("div");
        imgContainer.classList.add("img__container");
        container.append(imgContainer);

        /* Correct image from api, warning! Crazy cat image! 
        const image = document.createElement('img');
        image.src = this.data.image;
        container.append(image);
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

        const bookButton = document.createElement("button");
        bookButton.textContent = "Book this room";
        container.append(bookButton);

        return container;
    }
}

// Fetching Challenge data from API
class APIadapter {
    async getAllChallenges() {
        const url = 'https://lernia-sjj-assignments.vercel.app/api/challenges';
        const response = await fetch(url);
        const payload = await response.json();

        return payload.challenges.map((challengeData) => new Challenge(challengeData));
    }
}


// To show/create all Challenges
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




// Filter Challenges by Free text search





