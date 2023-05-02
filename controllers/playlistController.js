const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: 'dfc4ffb7c1c74f56901a254f9b3d975b',
  clientSecret: '41423bb149fe496d8007691da14502d2',
  redirectUri: 'http://localhost:3000/callback',
});

// Generate a new playlist based on user preferences
exports.generatePlaylist = async (req, res) => {
  const { genre, year, numSongs } = req.body;

  try {
    // Get a list of tracks from Spotify that match the genre and year criteria
    const { body: { tracks } } = await spotifyApi.getRecommendations({
      seed_genres: [genre],
      max_release_date: `${year}-12-31`,
      min_release_date: `${year}-01-01`,
      limit: numSongs,
    });

    // Extract the track IDs from the response
    const trackIds = tracks.map(track => track.id);

    // Create a new playlist on the user's Spotify account
    const { body: { id: playlistId } } = await spotifyApi.createPlaylist('My Awesome Playlist', { public: true });

    // Add the tracks to the playlist
    await spotifyApi.addTracksToPlaylist(playlistId, trackIds);

    // Return the playlist ID to the client
    res.status(200).json({ playlistId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error generating playlist' });
  }
};

// Save a generated playlist to the user's account
exports.savePlaylist = async (req, res) => {
  const { playlistId } = req.body;

  try {
    // Add the playlist to the user's Spotify account
    await spotifyApi.followPlaylist(playlistId);

    // Return a success message to the client
    res.status(200).json({ message: 'Playlist saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving playlist' });
  }
};
