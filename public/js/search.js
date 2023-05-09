const artistBtn = document.getElementById("artist");
const genreBtn = document.getElementById("genre");

function searchByArtist() {
  const artistInput = document.getElementById("input-one").value;
  fetch("/api/songs/artist/" + artistInput)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      const resultsEl = document.getElementById("results");

      resultsEl.innerHTML = "";

      for (i = 0; i < data.length; i++) {
        const newLi = document.createElement("li");

        const titleEl = document.createElement("h4");
        titleEl.textContent = data[i].title;

        const artistEl = document.createElement("h5");
        artistEl.textContent = data[i].artist;

        const genreEl = document.createElement("h6");
        genreEl.textContent = data[i].genre;

        const yearEl = document.createElement("h6");
        yearEl.textContent = data[i].year;

        const audioEl = document.createElement("audio");
        audioEl.setAttribute("id", "player-" + i);
        audioEl.setAttribute("class", "player");
        audioEl.setAttribute("data-song", data[i].audioSrc);
        audioEl.setAttribute("controls", "");

        const sourceEl = document.createElement("source");
        sourceEl.setAttribute("src", data[i].url);
        sourceEl.setAttribute("type", "audio/mpeg");
        audioEl.appendChild(sourceEl);

        newLi.append(titleEl, artistEl, genreEl, yearEl, audioEl);

        resultsEl.append(newLi);
      }
    });
}

function searchByGenre() {
  const genreInput = document.getElementById("input-two").value;

  fetch("/api/songs/genre/" + genreInput)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      const resultsEl = document.getElementById("results");

      resultsEl.innerHTML = "";

      for (i = 0; i < data.length; i++) {
        const newLi = document.createElement("li");

        const titleEl = document.createElement("h4");
        titleEl.textContent = data[i].title;

        const artistEl = document.createElement("h5");
        artistEl.textContent = data[i].artist;

        const genreEl = document.createElement("h6");
        genreEl.textContent = data[i].genre;

        const yearEl = document.createElement("h6");
        yearEl.textContent = data[i].year;

        const audioEl = document.createElement("audio");

        audioEl.setAttribute("id", "player-" + i);
        audioEl.setAttribute("class", "player");
        audioEl.setAttribute("data-song", data[i].audioSrc);
        audioEl.setAttribute("controls", "");

        const sourceEl = document.createElement("source");
        sourceEl.setAttribute("src", data[i].url);
        sourceEl.setAttribute("type", "audio/mpeg");
        audioEl.appendChild(sourceEl);

        newLi.append(titleEl, artistEl, genreEl, yearEl, audioEl);

        resultsEl.append(newLi);
      }
    });
}

artistBtn.addEventListener("click", searchByArtist);
genreBtn.addEventListener("click", searchByGenre);
