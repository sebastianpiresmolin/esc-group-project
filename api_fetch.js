// Test to fetch data from api //

const button = document.querySelector(".fetch_api");

button.addEventListener("click", function () {
    fetchData();
});

async function fetchData() {
    const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
    const data = await res.json();
    data.challenges.forEach(challenge => {
        console.log(challenge.title);
    });
}



