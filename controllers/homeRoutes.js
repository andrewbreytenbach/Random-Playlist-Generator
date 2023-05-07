const router = require('express').Router();
const {User}= require('../models');
const withAuth = require('../utils/auth');
const bcrypt = require('bcrypt');


router.get('/', (req, res) => {
  // If a session exists, redirect the request to the dashboard
  if (req.session.logged_in) {
    res.render('dashboard', {
      title: 'Dashboard',
      logged_in: req.session.logged_in
    });
  } else {
    res.render('partials/login', {
      title: 'Login',
      logged_in: false
    });
  }
});


// Define route for dashboard
router.get('/dashboard', (req, res) => {
  // Render the dashboard view using res.render() function
  if (req.session.logged_in) {
    res.render('dashboard', {
      title: 'Dashboard',
      logged_in: true
    });
  } else {
    res.render('partials/login', {
      title: 'Login'
    });
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard', { title: 'Dashboard' });
  } else {
    res.render('partials/login', { title: 'Login' });
  }
});

router.get('/signup', (req, res) => {
  res.render('partials/login', {
    errors: null
  });
});

router.post('/signup', async (req, res) => {
  const {name, email, password } = req.body;
  const errors=[];
  try {
    // Validate input
    if (!name || !email || !password) {
      errors.push("Please enter all fields")
      res.render('partials/login', { errors });
      return;
      //  return res.status(400).json({ message: 'Please enter all fields'});
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
    // const errors=[]
    // if(error != undefined){
    //   errors = error.errors.map(err => err.message);
    // }
    res.render('partials/login', {
      errors
    });
  }
});


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
  req.session.logged_in = true;
  req.session.user_id = user.id;

  res.redirect('/dashboard');
});


router.get('/logout', (req, res) => {
  req.session.logged_in = false;
  res.redirect('/login');
});


module.exports = router;