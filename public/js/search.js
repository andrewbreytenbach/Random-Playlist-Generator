const artistBtn = document.getElementById("artist")
const genreBtn = document.getElementById("genre")

function searchByArtist () {
    const artistInput = document.getElementById("input-one").value
    fetch("/api/songs/artist/" + artistInput)
    .then(res => res.json())
    .then(data => {
        console.log(data)

        const resultsEl = document.getElementById("results");

        resultsEl.innerHTML = "";

        for(i = 0; i < data.length; i++) {
            const newLi = document.createElement("li");

            const titleEl = document.createElement("h4");
            titleEl.textContent = data[i].title;

            const artistEl = document.createElement("h5");
            artistEl.textContent = data[i].artist;

            const genreEl = document.createElement("h6");
            genreEl.textContent = data[i].genre;
            
            const yearEl = document.createElement("h6");
            yearEl.textContent = data[i].year;

            newLi.append(titleEl, artistEl, genreEl, yearEl)

            resultsEl.append(newLi)
        }
    })
}

function searchByGenre () {
    const genreInput = document.getElementById("input-two").value
    fetch("/api/songs/genre/" + genreInput)
    .then(res => res.json())
    .then(data => {
            console.log(data)
            
            const resultsEl = document.getElementById("results");

            resultsEl.innerHTML = "";
    
            for(i = 0; i < data.length; i++) {
                const newLi = document.createElement("li");
    
                const titleEl = document.createElement("h4");
                titleEl.textContent = data[i].title;
    
                const artistEl = document.createElement("h5");
                artistEl.textContent = data[i].artist;
    
                const genreEl = document.createElement("h6");
                genreEl.textContent = data[i].genre;
                
                const yearEl = document.createElement("h6");
                yearEl.textContent = data[i].year;
    
                newLi.append(titleEl, artistEl, genreEl, yearEl)
    
                resultsEl.append(newLi)
            }
        })
    }
    function displayPlaylist(playlist) {
        const playlistElement = document.getElementById('playlist');
        playlistElement.innerHTML = '';
        for (const song of playlist) {
          const li = document.createElement('li');
          li.innerHTML = `${song.name} by ${song.artist} <button class="play-button">Play</button>`;
          playlistElement.appendChild(li);
          
          // Load the audio file using Howler.js
          const sound = new Howl({
            src: [song.url],
          });
          
          // Set up a click listener on the Play button to play the audio
          const playButton = li.querySelector('.play-button');
          playButton.addEventListener('click', () => {
            sound.play();
          });
        }
      }
      

artistBtn.addEventListener("click", searchByArtist);
genreBtn.addEventListener("click", searchByGenre);