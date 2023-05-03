// Require necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models');

//setting up handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

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

//defining routes
const loginRoutes = require('./api/loginRoutes');
const signupRoutes = require('./api/signupRoutes');

app.use('/', loginRoutes);
app.use('/', signupRoutes);

//Render auth template that consists of login and signup
app.get('/auth', (req, res) => {
  res.render('auth');
});

//set up default engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up API routes
app.get('/api/songs', (req, res) => {
  // Placeholder response
  const songs = [
    { id: 1, title: 'Song 1', artist: 'Artist 1', year: 2000, genre: 'Rock' },
    { id: 2, title: 'Song 2', artist: 'Artist 2', year: 2005, genre: 'Pop' },
    { id: 3, title: 'Song 3', artist: 'Artist 3', year: 2010, genre: 'Hip-hop' },
  ];
  res.json(songs);
});

// Start the server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
});
