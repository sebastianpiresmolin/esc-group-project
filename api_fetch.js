// Test to fetch data from api //
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
/*
const button = document.querySelector(".fetch_api");

button.addEventListener("click", async function () {
    await fetchChallengeData();
    const filterData = challenges.find(challenge => challenge.id === 4);
    console.log(filterData);
});
*/

/*   -----------------------------   */

async function displayChallenges() {
    const challenges = await fetchChallengeData();
    const challengesContainer = document.getElementById("challenges__container");

    challenges.forEach(challenge => {
        const challengeElement = document.createElement("div");
        challengeElement.classList.add("challenge");

        const titleElement = document.createElement("h2");
        titleElement.textContent = challenge.title;

        const typeElement = document.createElement("p");
        typeElement.textContent = "Type: " + challenge.type;

        const ratingElement = document.createElement("p");
        ratingElement.textContent = "Rating: " + challenge.rating;

        const participantsElement = document.createElement("p");
        participantsElement.textContent = "Participants: " + challenge.minParticipants + " - " + challenge.maxParticipants;

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = "Description: " + challenge.description;

        challengeElement.appendChild(titleElement);
        challengeElement.appendChild(typeElement);
        challengeElement.appendChild(ratingElement);
        challengeElement.appendChild(participantsElement);
        challengeElement.appendChild(descriptionElement);
        challengesContainer.appendChild(challengeElement);
    });
}

displayChallenges();