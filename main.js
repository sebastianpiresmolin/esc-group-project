/* ------------------------MOBILE MENU------------------------ */

document.getElementById("headerButton").addEventListener('click', function() {
    let menuOverlay = document.getElementById("menuOverlay");
    let popinMenu = document.getElementById("popinMenu");

    menuOverlay.style.display = 'block'; // This shows my white overlay
    popinMenu.style.display = 'flex'; // This shows my popin menu

    setTimeout(function() {
        popinMenu.style.animation = 'grow 0.1s linear';
        popinMenu.style.opacity = 1
    }, 100);

    setTimeout(function() {
        menuOverlay.style.animation = 'fadein 0.3s linear';
        menuOverlay.style.opacity = 1
    }, 10);

    document.documentElement.style.overflowY = 'hidden'; // This disables the ability to scroll behind the menu
});

document.getElementById("closebtn").addEventListener('click', function() {
    let menuOverlay = document.getElementById("menuOverlay");
    let popinMenu = document.getElementById("popinMenu");

    menuOverlay.style.animation = ''; // This resets the animation between each use.
    popinMenu.style.animation = ''; // Otherwise its buggy until the page refreshes.

    menuOverlay.style.opacity = 0;
    popinMenu.style.opacity = 0;
    
    setTimeout(function() {
        menuOverlay.style.display = 'none'; // This hides my white overlay
        popinMenu.style.display = 'none'; // This hides my popin menu
    }, 200);
    
    document.documentElement.style.overflowY = 'auto'; // This enables the ability to scroll again
});

/*------------------------MOBILE MENU------------------------*/

/*------------------------STAR RATING------------------------*/

// Get all the stars
const fromStars = [
    document.querySelector('#fromOne'),
    document.querySelector('#fromTwo'),
    document.querySelector('#fromThree'),
    document.querySelector('#fromFour'),
    document.querySelector('#fromFive')
];

const toStars = [
    document.querySelector('#toOne'),
    document.querySelector('#toTwo'),
    document.querySelector('#toThree'),
    document.querySelector('#toFour'),
    document.querySelector('#toFive')
];

// Function to handle star click
let fromRating = 1;
let toRating = 5;

function handleStarClick(stars, index, isFromStars) {
    // Remove 'checked' class from all stars
    stars.forEach(star => star.classList.remove('checked'));

    // Add 'checked' class to clicked star and all previous stars
    for (let i = 0; i <= index; i++) {
        stars[i].classList.add('checked');
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
                stars[i].classList.remove('checked');
            }
        }
    } else {
        toRating = rating;
    }

    console.log(`From: ${fromRating}, To: ${toRating}`);
}

// Add event listeners to all stars
fromStars.forEach((star, index) => {
    star.addEventListener('click', () => handleStarClick(fromStars, index, true));
});

toStars.forEach((star, index) => {
    star.addEventListener('click', () => handleStarClick(toStars, index, false));
});

/*------------------------STAR RATING------------------------*/

/*------------------------TAGS------------------------*/

// Get all the tags

const tags = [
    document.querySelector('#web'),
    document.querySelector('#linux'),
    document.querySelector('#cryptography'),
    document.querySelector('#coding'),
    document.querySelector('#ssh'),
    document.querySelector('#ctf'),
    document.querySelector('#hacking'),
    document.querySelector('#bash'),
    document.querySelector('#javascript'),
    document.querySelector('#electronics'),
    document.querySelector('#phreaking')
];

let activeTags = [];

// Function to handle tag click
function handleTagClick(tag) {
    const tagId = tag.id; // Get the id of the tag

    // Check if the tag is already active
    if (tag.classList.contains('active')) {
        // If it's active, remove the 'active' class and remove it from the activeTags array
        tag.classList.remove('active');
        activeTags = activeTags.filter(activeTag => activeTag !== tagId);
    } else {
        // If it's not active, add the 'active' class and add it to the activeTags array
        tag.classList.add('active');
        activeTags.push(tagId);
    }
    console.log(activeTags);
}

// Add event listeners to all tags
tags.forEach(tag => {
    tag.addEventListener('click', () => handleTagClick(tag));
});

/*------------------------TAGS------------------------*/