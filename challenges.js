/* ------------------------MOBILE MENU------------------------ */
//aa
document.getElementById("headerButton").addEventListener("click", function () {
  let menuOverlay = document.getElementById("menuOverlay");
  let popinMenu = document.getElementById("popinMenu");

  menuOverlay.style.display = "block"; // This shows my white overlay
  popinMenu.style.display = "flex"; // This shows my popin menu

  setTimeout(function () {
    popinMenu.style.animation = "grow 0.1s linear";
    popinMenu.style.opacity = 1;
  }, 100);

  setTimeout(function () {
    menuOverlay.style.animation = "fadein 0.3s linear";
    menuOverlay.style.opacity = 1;
  }, 10);

  document.documentElement.style.overflowY = "hidden"; // This disables the ability to scroll behind the menu
});

document.getElementById("closebtn").addEventListener("click", function () {
  let menuOverlay = document.getElementById("menuOverlay");
  let popinMenu = document.getElementById("popinMenu");

  menuOverlay.style.animation = ""; // This resets the animation between each use.
  popinMenu.style.animation = ""; // Otherwise its buggy until the page refreshes.

  menuOverlay.style.opacity = 0;
  popinMenu.style.opacity = 0;

  setTimeout(function () {
    menuOverlay.style.display = "none"; // This hides my white overlay
    popinMenu.style.display = "none"; // This hides my popin menu
  }, 200);

  document.documentElement.style.overflowY = "auto"; // This enables the ability to scroll again
});

let filterButton = document.getElementById("filterButton");
let filterWindow = document.getElementById("filterWindow");
document.getElementById("closeFilter").addEventListener("click", function () {
  filterWindow.style.display = "none";
  filterButton.style.display = "block";
});

document.getElementById("filterButton").addEventListener("click", function () {
  setTimeout(function () {
    filterWindow.style.animation = "grow 0.1s ease";
    filterWindow.style.opacity = 1;
    filterWindow.style.display = "flex";
    filterButton.style.display = "none";
  }, 10);
});

/*------------------------MOBILE MENU------------------------*/

/*------------------------FILTER FUNCTIONALITY---------------*/

/*------------------------FILTER FUNCTIONALITY---------------*/
