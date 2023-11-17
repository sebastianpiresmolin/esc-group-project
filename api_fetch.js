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