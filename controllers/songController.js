const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: 'dfc4ffb7c1c74f56901a254f9b3d975b',
  clientSecret: '41423bb149fe496d8007691da14502d2',
  redirectUri: 'http://localhost:3000/callback',
});

// Fetch a list of songs that match the given search query
exports.searchSongs = async (req, res) => {
  const { query } = req.params;

  try {
    // Search for tracks that match the query
    const { body: { tracks } } = await spotifyApi.searchTracks(query);

    // Return the list of tracks to the client
    res.status(200).json({ tracks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching songs' });
  }
};
