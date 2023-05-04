const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
// router.get('/', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ASC']],
//     });

//     const users = userData.map((project) => project.get({ plain: true }));

//     res.render('homepage', {
//       users,
//       // Pass the logged in flag to the template
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/', (req, res) => {
 // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
   res.redirect('/dashboard');
    return;
   }

  res.render('login');
});

// router.get('/dashboard', (req, res) => {
//   // If a session exists, redirect the request to the homepage
 

//   res.render('dashboard');
// });
// router.post('/login', async (req, res) => {
//   try {
//     // Authenticate the user
//     const user = await User.authenticate(req.body.email, req.body.password);
    
//     // Set the user ID in the session
//     req.session.userId = user.id;

//     // Redirect to the navbar page
//     res.redirect('/navbar');
//   } catch (error) {
//     // Handle authentication errors
//     res.render('login', { error: error.message });
//   }
// });


module.exports = router;
