const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: 'dfc4ffb7c1c74f56901a254f9b3d975b',
  clientSecret: '41423bb149fe496d8007691da14502d2',
  redirectUri: 'http://localhost:3000/callback',
});

// Fetch the current user's profile
exports.getUserProfile = async (req, res) => {
  try {
    // Get the user's profile from Spotify
    const { body: { display_name: displayName, email } } = await spotifyApi.getMe();

    // Return the user's profile to the client
    res.status(200).json({ displayName, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching user profile' });
  }
};

// Update the current user's profile
exports.updateUserProfile = async (req, res) => {
  const { displayName } = req.body;

  try {
    // Update the user's profile on Spotify
    await spotifyApi.setDisplayName(displayName);

    // Return a success message to the client
    res.status(200).json({ message: 'Profile updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating user profile' });
  }
};

// Delete the current user's account
exports.deleteUserAccount = async (req, res) => {
  try {
    // Delete the user's Spotify account
    await spotifyApi.revokeAuthorization();

    // Return a success message to the client
    res.status(200).json({ message: 'Account deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting user account' });
  }
};
