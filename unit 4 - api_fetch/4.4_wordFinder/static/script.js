const greyLetters = document.getElementById("greyLetters");
const findButton = document.getElementById("findButton");
const routeLink = document.getElementById("routeLink");
const resultOutput = document.getElementById("resultOutput");

findButton.addEventListener("click", findWords);

function findWords() {
  const letters = greyLetters.value.replace(/[^a-z]/gi, "").toLowerCase();
  const route = `/${letters}`;

  routeLink.href = route;
  routeLink.textContent = route;
  resultOutput.textContent = "Loading...";

  fetch(route)
    .then((response) => response.json())
    .then((words) => {
      resultOutput.textContent = JSON.stringify(words, null, 2);
    });
}
