// Import the Router function from the Express package
const router = require('express').Router();
// Import the User model from the models directory
const {User}= require('../models');
//Import the withAuth middleware from the utils directory
const withAuth = require('../utils/auth');
// Import the bcrypt module for password hashing
const bcrypt = require('bcrypt');

// Define a GET route for the root path '/'
router.get('/', withAuth, (req, res) => {
  res.render('dashboard', {
    title: 'Dashboard',
    logged_in: req.session.logged_in
  });
});


// Define route for /dashboard path
router.get('/dashboard', withAuth, (req, res) => {
  const username = req.session.username;
  res.render('dashboard', {
    title: 'Dashboard',
    logged_in: req.session.logged_in,
    username : username
  });
});

//Get route for login path
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    //if the session exists user will be directed to dashboard
    res.redirect('/');
    return;
  }
  res.render('partials/login', { title: 'Login' });
});

//Get route for signup path
router.get('/signup', (req, res) => {
  res.render('partials/login', {
     // Render the login form with no errors
    errors: null
  });
});

// Define a POST route for the '/signup' path
router.post('/signup', async (req, res) => {
  // Extract name, email, and password from the request body
  const {name, email, password } = req.body;
  // Define an empty array to store any errors
  const errors=[];
  try {
    // If any field is missing, push an error message to the array
    if (!name || !email || !password) {
      errors.push("Please enter all fields")
       // Render the login form with the errors
      res.render('partials/login', { errors });
      return;
    }

    // Check if user with the same email already exists
    const existingUser = await User.findOne({where: {email}});

    if (existingUser) {
      errors.push("User already exists")
      res.render('partials/login', { errors });
      return;
    }

    // Create a new user with the given data
    const newUser = await User.create({name, email, password});

    res.render('dashboard', {
      title: 'Dashboard',
      logged_in: true
    });
    
  } catch (error) {
    // Show the error message on the login page
    const errors = error.errors.map(err => err.message);
    res.render('partials/login', {
      errors
    });
  }
});

//POST route for login path if user, password are invalid then they are directed to login page 
router.post('/login', async (req, res) => {
  const {email, password } = req.body;
  const user = await User.findOne({where: {email}});
  if (!user) {
    res.render('partials/login', {
      error: 'User credentials are incorrect'
    });
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.render('partials/login', {
      error: 'User credentials are incorrect'
    });
    return;
  }
  //once the user login, session starts, user is authenticated
  req.session.logged_in = true;
  //The id of the authenticated user in the database is stored in the user_id session variable so that it can be used to identify the user for subsequent requests.
  req.session.user_id = user.id;
  req.session.username = user.name;

  res.redirect('/dashboard');
});

//GET Route for logout path
router.get('/logout', (req, res) => {
  //setting false value will destroy users session and log out from the site
  req.session.logged_in = false;
  res.redirect('/login');
});

// Define route for about navigation
router.get('/about', withAuth, (req, res) => {
  res.render('about', {
    title: 'About',
    logged_in: req.session.logged_in
  });
});

// Define route for about navigation
router.get('/savedPlaylist', withAuth, (req, res) => {
  res.render('savedPlaylist', {
    title: 'Saved Playlist',
    logged_in: req.session.logged_in
  });
});


module.exports = router;