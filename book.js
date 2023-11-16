//Book Room
let stepOneWindow = document.querySelector(".modal__stepOne");
let stepTwoWindow = document.querySelector(".modal__stepTwo");
let stepThreeWindow = document.querySelector(".modal__stepThree");

let btnBookRoom = document.querySelector(".buttonBox__button");
let btnSearch = document.querySelector(".button__search");
let btnSubmit = document.querySelector(".button__submit");
let linkBackToChallenges = document.querySelector(".link__back");

btnBookRoom.addEventListener("click", () => {
  stepOneWindow.style.display = "block";
});

btnSearch.addEventListener("click", () => {
  stepOneWindow.style.display = "";
  stepTwoWindow.style.display = "block";
  console.log("hello");
});

btnSubmit.addEventListener("click", () => {
  stepTwoWindow.style.display = "";
  stepThreeWindow.style.display = "block";
  console.log("hello");
});

linkBackToChallenges.addEventListener("click", () => {
  stepThreeWindow.style.display = "";
  console.log("hello");
});

//Select options
const optionMenu = document.querySelector(".modal__select");
const selectBtn = document.querySelector(".select__button");
const options = document.querySelectorAll(".options");
const sBtnText = document.querySelector(".sBtn__text");

selectBtn.addEventListener("click", () =>
  optionMenu.classList.toggle("active")
);

options.forEach(option => {
  option.addEventListener("click", () => {
    let selectedOption = option.querySelector(".option__text").innerText;
    sBtnText.innerText = selectedOption;
  });
});

const challengesArray = []
async function getChallengesData() {
    
    const url = 'https://lernia-sjj-assignments.vercel.app/api/challenges'
    const res = await fetch(url);
    const data = await res.json();
    
    for (let i = 0; i < data.challenges.length; i++) {
        challengesArray.push(data.challenges[i])
    }
}

getChallengesData();
console.log('Challenges', challengesArray)
