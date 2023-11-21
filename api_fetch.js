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
        container.appendChild(imgContainer);

        /* Warning! Crazy cat image! 
        const image = document.createElement('img');
        image.src = this.data.image;
        container.append(image);
        */

        const titleElement = document.createElement("h2");
        titleElement.textContent = this.data.title;
        container.appendChild(titleElement);

        const typeElement = document.createElement("p");
        typeElement.textContent = "Type: " + this.data.type;
        container.appendChild(typeElement);

        const ratingElement = document.createElement("p");
        ratingElement.textContent = "Rating: " + this.data.rating;
        container.appendChild(ratingElement);

        const participantsElement = document.createElement("p");
        participantsElement.textContent = "Participants: " + this.data.minParticipants + " - " + this.data.maxParticipants;

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = "Description: " + this.data.description;





        container.appendChild(participantsElement);
        container.appendChild(descriptionElement);




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


// To show/create Challenges in DOM
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

const challengesDiv = document.querySelector('#challenges__container');

const view = new ChallengeListView();
view.render(challengesDiv);