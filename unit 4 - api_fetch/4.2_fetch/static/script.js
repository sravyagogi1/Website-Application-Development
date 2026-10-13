const datePicker = document.getElementById("datePicker");
const container = document.getElementById("scheduleContainer");

datePicker.addEventListener("change", () => {
  const date = datePicker.value;

  if (!date) {
    showMessage("Select a date to view the schedule!");
    return;
  }

  showMessage("Loading schedule...");

  fetch(`/get_schedule_from_ion/${date}`)
    .then((response) => response.json())
    .then((data) => displaySchedule(data))
    .catch(() => {
      showMessage("Could not load the schedule. Please try another date.");
    });
});

function displaySchedule(data) {
  container.replaceChildren();

  if (data.error) {
    showMessage(data.error);
    return;
  }

  if (!data || data.length === 0) {
    showMessage("No schedule available for that date.");
    return;
  }

  const ul = document.createElement("ul");
  ul.className = "schedule-list";

  data.forEach((block) => {
    const li = document.createElement("li");
    li.className = "schedule-block";

    const name = document.createElement("strong");
    name.textContent = block.name || "Block";

    const time = document.createElement("span");
    time.textContent = formatBlockTime(block);

    li.appendChild(name);
    li.appendChild(time);
    ul.appendChild(li);
  });

  container.appendChild(ul);
}

function showMessage(message) {
  const p = document.createElement("p");
  p.textContent = message;
  container.replaceChildren(p);
}

function formatBlockTime(block) {
  const start = block.start || block.start_time || "";
  const end = block.end || block.end_time || "";

  if (!start && !end) {
    return "Time not listed";
  }

  return `${start} - ${end}`;
}
