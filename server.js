// // Require necessary modules
// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const db = require('./models');

// //setting up handlebars
// const exphbs = require('express-handlebars');
// const hbs = exphbs.create({});

// // Set up Express app
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Set up middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

// // Set up HTML routes
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });

// //defining routes
// const loginRoutes = require('./api/loginRoutes');
// const signupRoutes = require('./api/signupRoutes');

// app.use('/', loginRoutes);
// app.use('/', signupRoutes);

// //Render auth template that consists of login and signup
// app.get('/auth', (req, res) => {
//   res.render('auth');
// });

// //set up default engine
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// // Set up API routes
// app.get('/api/songs', (req, res) => {
//   // Placeholder response
//   const songs = [
//     { id: 1, title: 'Song 1', artist: 'Artist 1', year: 2000, genre: 'Rock' },
//     { id: 2, title: 'Song 2', artist: 'Artist 2', year: 2005, genre: 'Pop' },
//     { id: 3, title: 'Song 3', artist: 'Artist 3', year: 2010, genre: 'Hip-hop' },
//   ];
//   res.json(songs);
// });

// // Start the server
// db.sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server listening on PORT ${PORT}`);
//   });
// });


const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create();

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
