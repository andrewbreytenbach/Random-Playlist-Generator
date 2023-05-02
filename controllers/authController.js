const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: 'dfc4ffb7c1c74f56901a254f9b3d975b',
  clientSecret: '41423bb149fe496d8007691da14502d2',
  redirectUri: 'http://localhost:3000/callback',
});

// Redirect the user to Spotify's authorization page
exports.authenticateUser = (req, res) => {
  const scopes = ['user-read-private', 'user-read-email'];
  const authorizeUrl = spotifyApi.createAuthorizeURL(scopes);

  res.redirect(authorizeUrl);
};

// Exchange the authorization code for an access token and refresh token
exports.handleCallback = async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange the authorization code for an access token and refresh token
    const { body: { access_token: accessToken, refresh_token: refreshToken } } = await spotifyApi.authorizationCodeGrant(code);

    // Set the access token and refresh token for future API requests
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.setRefreshToken(refreshToken);

    // Redirect the user to the home page
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error authenticating user' });
  }
};
