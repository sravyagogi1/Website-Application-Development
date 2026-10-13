const container = document.getElementById("wordContainer");

const sections = [
  ["six_letter_words", "Words with a length of 6"],
  ["words_with_e", "Words that include the letter e"],
  ["words_without_e", "Words that do not include the letter e"],
  ["five_letter_e_not_first", "5 letter words with e, but not first"],
];

fetch("/words")
  .then((response) => response.json())
  .then((data) => showWords(data))
  .catch(() => {
    container.textContent = "Could not load the word lists.";
  });

function showWords(data) {
  container.replaceChildren();

  sections.forEach(([key, title]) => {
    const words = data[key] || [];
    const section = document.createElement("section");
    const heading = document.createElement("h2");
    const list = document.createElement("ul");

    section.className = "word-section";
    list.className = "word-list";
    heading.textContent = `${title} (${words.length})`;

    words.forEach((word) => {
      const item = document.createElement("li");
      item.textContent = word;
      list.appendChild(item);
    });

    section.appendChild(heading);
    section.appendChild(list);
    container.appendChild(section);
  });
}
