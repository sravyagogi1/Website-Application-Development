const board = document.getElementById("board");
const encodeButton = document.getElementById("encodeButton");
const clearButton = document.getElementById("clearButton");
const encodedLink = document.getElementById("encodedLink");
const result = document.getElementById("result");

const colorNames = ["grey", "yellow", "green"];
const rowCount = 6;
const columnCount = 5;

makeBoard();

encodeButton.addEventListener("click", parseBoard);
clearButton.addEventListener("click", clearBoard);

function makeBoard() {
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    const row = document.createElement("div");
    row.className = "row";

    for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
      const tile = document.createElement("input");
      tile.className = "tile grey";
      tile.maxLength = 1;
      tile.dataset.color = "0";
      tile.dataset.row = rowIndex;
      tile.dataset.column = columnIndex;
      tile.title = "Click to switch grey, yellow, and green";

      tile.addEventListener("input", cleanTileLetter);
      tile.addEventListener("click", changeTileColor);

      row.appendChild(tile);
    }

    board.appendChild(row);
  }
}

function cleanTileLetter(event) {
  event.target.value = event.target.value.replace(/[^a-z]/gi, "").slice(0, 1).toUpperCase();
}

function changeTileColor(event) {
  const tile = event.target;
  const nextColor = (Number(tile.dataset.color) + 1) % colorNames.length;

  tile.dataset.color = String(nextColor);
  tile.className = `tile ${colorNames[nextColor]}`;
}

function encodeBoard() {
  const rows = [...board.querySelectorAll(".row")];
  const encodedRows = [];

  rows.forEach((row) => {
    const tiles = [...row.querySelectorAll(".tile")];
    const letters = tiles.map((tile) => tile.value.trim().toLowerCase());

    if (letters.every((letter) => letter === "")) {
      return;
    }

    if (letters.some((letter) => letter === "")) {
      return;
    }

    const encodedRow = tiles
      .map((tile) => `${tile.value.trim().toLowerCase()}${tile.dataset.color}`)
      .join("");

    encodedRows.push(encodedRow);
  });

  return encodedRows.join("-");
}

function parseBoard() {
  const boardCode = encodeBoard();
  const url = boardCode ? `/getwords/${boardCode}` : "/getwords";

  encodedLink.href = url;
  encodedLink.textContent = url;
  result.textContent = "Loading...";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      result.textContent = JSON.stringify(data, null, 2);
    })
    .catch(() => {
      result.textContent = "Could not parse this board.";
    });
}

function clearBoard() {
  board.querySelectorAll(".tile").forEach((tile) => {
    tile.value = "";
    tile.dataset.color = "0";
    tile.className = "tile grey";
  });

  encodedLink.href = "/getwords";
  encodedLink.textContent = "/getwords";
  result.textContent = "Fill in at least one full row, then parse the board.";
}
