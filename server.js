// Require necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models');

// Set up Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set up HTML routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Set up API routes for generating a playlist
app.post('/api/generatePlaylist', playlistController.generatePlaylist);


// Set up API routes
app.get('/api/songs', (req, res) => {
    db.Song.findAll({}).then((dbSongs) => {
        res.json(dbSongs);
    });
});

// Start the server
db.sequelize.sync({ force: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error synchronizing Sequelize models with database:', err);
  });
