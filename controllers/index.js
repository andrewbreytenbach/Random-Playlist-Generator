
// Importing the Router class from the Express.js framework to define routes.
const router = require('express').Router();

// const apiRoutes = require('./api');
// Importing the API routes module from the current directory. This line is commented out.

// Importing the homeRoutes module from the current directory.
const homeRoutes = require('./homeRoutes');

// Mounting the homeRoutes module to the root path '/'. This middleware function is called for all HTTP methods.
router.use('/', homeRoutes);


// router.use('/api', apiRoutes);
// Mounting the apiRoutes module to the '/api' path. This line is commented out.


// Exporting the router object to be used by the app.js file.
module.exports = router;

