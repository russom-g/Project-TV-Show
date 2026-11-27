//You can edit ALL of the code here
function setup() {
  const state = {
    allEpisodes: getAllEpisodes(),
    searchTerm: "",
  }
  makePageForEpisodes(state);
  eventListening(state);
}

function createTvCard(episode) {
  const template = document.getElementById("tv-show-card");
  const card = template.content.cloneNode(true);

  card.querySelector("h3").textContent =
    `${episode.name} – S${String(episode.season).padStart(2, "0")}E${String(episode.number).padStart(2, "0")}`;
  card.querySelector("p").innerHTML = episode.summary;

  const img = card.querySelector("img");
  img.src = episode.image.medium;
  img.alt = episode.name;

  const link = card.querySelector("a");
  link.href = episode.url;
  link.textContent = "View on TVMaze";
  link.target = "_blank";

  return card;
}

function makePageForEpisodes(state) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  const filteredEpisodes = state.allEpisodes.filter((episode) =>
    (episode.name.toLowerCase().includes(state.searchTerm.toLowerCase())) ||
    (episode.summary.toLowerCase().includes(state.searchTerm.toLowerCase())),
  );

  filteredEpisodes.forEach((episode) => {
    rootElem.appendChild(createTvCard(episode));
  });
}

function eventListening(state) {
  const searchBox = document.getElementById("search");

  searchBox.addEventListener("input", handleSearchInput);

  function handleSearchInput(event) {
    state.searchTerm = event.target.value;
    makePageForEpisodes(state);
  }
}

window.onload = setup;

