const board = document.getElementById("board");
const findButton = document.getElementById("findButton");
const clearButton = document.getElementById("clearButton");
const routeLink = document.getElementById("routeLink");
const wordCount = document.getElementById("wordCount");
const validWords = document.getElementById("validWords");

const colorNames = ["grey", "yellow", "green"];
const rowCount = 6;
const columnCount = 5;
const tiles = [];
let selectedIndex = 0;

makeBoard();
selectTile(0);

window.addEventListener("keydown", handleKey);
findButton.addEventListener("click", findWords);
clearButton.addEventListener("click", clearBoard);

document.querySelectorAll("[data-color]").forEach((button) => {
  button.addEventListener("click", () => {
    setTileColor(tiles[selectedIndex], button.dataset.color);
  });
});

function makeBoard() {
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    const row = document.createElement("div");
    row.className = "row";

    for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
      const tile = document.createElement("div");
      tile.className = "tile grey";
      tile.dataset.color = "0";
      tile.dataset.letter = "";
      tile.dataset.index = String(tiles.length);

      tile.addEventListener("click", () => {
        selectTile(Number(tile.dataset.index));
      });

      row.appendChild(tile);
      tiles.push(tile);
    }

    board.appendChild(row);
  }
}

function handleKey(event) {
  const key = event.key;

  if (/^[a-z]$/i.test(key)) {
    const tile = tiles[selectedIndex];
    tile.dataset.letter = key.toLowerCase();
    tile.textContent = key.toUpperCase();
    selectTile(Math.min(selectedIndex + 1, tiles.length - 1));
  }

  if (key === "Backspace") {
    const tile = tiles[selectedIndex];

    if (tile.dataset.letter) {
      tile.dataset.letter = "";
      tile.textContent = "";
    } else {
      selectTile(Math.max(selectedIndex - 1, 0));
      tiles[selectedIndex].dataset.letter = "";
      tiles[selectedIndex].textContent = "";
    }
  }

  if (key === "ArrowLeft") {
    selectTile(Math.max(selectedIndex - 1, 0));
  }

  if (key === "ArrowRight") {
    selectTile(Math.min(selectedIndex + 1, tiles.length - 1));
  }
}

function selectTile(index) {
  tiles[selectedIndex].classList.remove("selected");
  selectedIndex = index;
  tiles[selectedIndex].classList.add("selected");
}

function setTileColor(tile, color) {
  tile.classList.remove(...colorNames);
  tile.classList.add(colorNames[Number(color)]);
  tile.dataset.color = color;
}

function encodeBoard() {
  const encodedRows = [];

  for (let rowStart = 0; rowStart < tiles.length; rowStart += columnCount) {
    const rowTiles = tiles.slice(rowStart, rowStart + columnCount);
    const letters = rowTiles.map((tile) => tile.dataset.letter);

    if (letters.every((letter) => letter === "")) {
      continue;
    }

    if (letters.some((letter) => letter === "")) {
      continue;
    }

    const encodedRow = rowTiles
      .map((tile) => `${tile.dataset.letter}${tile.dataset.color}`)
      .join("");

    encodedRows.push(encodedRow);
  }

  return encodedRows.join("-");
}

function findWords() {
  const boardCode = encodeBoard();
  const route = boardCode ? `/getwords/${boardCode}` : "/getwords";

  routeLink.href = route;
  routeLink.textContent = route;
  wordCount.textContent = "Loading...";
  validWords.textContent = "";

  fetch(route)
    .then((response) => response.json())
    .then((data) => {
      wordCount.textContent = `${data.valid_words.length} valid words`;
      validWords.textContent = data.valid_words.join("\n");
    })
    .catch(() => {
      wordCount.textContent = "Could not load words.";
    });
}

function clearBoard() {
  tiles.forEach((tile) => {
    tile.dataset.letter = "";
    tile.textContent = "";
    setTileColor(tile, "0");
  });

  selectTile(0);
  routeLink.href = "/getwords";
  routeLink.textContent = "/getwords";
  wordCount.textContent = "No search yet.";
  validWords.textContent = "";
}
