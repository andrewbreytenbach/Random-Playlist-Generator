function generatePlaylist() {
  const artist = document.getElementById('artist').value;
  const decade = document.getElementById('decade').value;
  const genre = document.getElementById('genre').value;
  
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/songs?artist=${artist}&decade=${decade}&genre=${genre}`);
  xhr.onload = function() {
    if (xhr.status === 200) {
      const songs = JSON.parse(xhr.responseText);
      const playlist = generateRandomPlaylist(10, songs);
      displayPlaylist(playlist);
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.send();
}
  
function generateRandomPlaylist(length, songs) {
  const playlist = [];
  while (playlist.length < length && songs.length > 0) {
    const index = getRandomIndex(songs.length);
    playlist.push(songs[index]);
    songs.splice(index, 1);
  }
  return playlist;
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

