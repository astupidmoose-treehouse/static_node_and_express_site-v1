// create an express variable and require express module
const express = require('express');

// create an object for the json data we created so we can work with this object later
const { projects } = require('./data.json');

// create an app, using express
const app = express();
// assign the port for the app to 3000
const port = 3000;

// assign the PUG templating system as the view engine. 
app.set('view engine', 'pug')

// serve the "public" folder, through the "/static" route
app.use('/static', express.static('public'))

// * Set our routes
// set a home route, pass it the projects object. It will use the index pug file
app.get('/', (req, res) => res.render("index", {projects}));

// set a about route, using the about pug file
app.get('/about', (req, res) => res.render("about"));

// set a /projects route that looks for the Id passed via parameters. 
// ! We need to check if Id exists
app.get('/projects/:id', (req, res) => {
    // set the specific project based on the ID parameter
    const project = projects[req.params.id];
    // render the project pug file, passing in the project variable as an object. 
    res.render("project", {project})
});


// lets listen to the port we specificed, and log a message to the console saying its running! 
app.listen(port, () => console.log(`App listening on port ${port}!`));


// Handle errors
// If a user navigates to a non-existent route, or if a request for a resource fails for whatever reason, your app should handle the error in a user friendly way.
// Add an error handler to app.js that sets the error message to a user friendly message, and sets the status code.
// Log out a user friendly message to the console when the app is pointed at a URL that doesn't exist as a route in the app, such as /error/error.
// Refer to the video on Error handling Middleware, which is linked in the project resources list.


// Layout, CSS and styles
// The layout of the finished project should match the provided mockups.
// To really make this project your own, you should customize the CSS following the suggestions in the Extra Credit section at the bottom of this page.
// Add good code comments

// ! Extra Credit work
// Use error handling middleware to render a Pug template
// Create a new Pug template in the views folder and name it error.pug. This Pug file should extend the layout, be set to block content, and display the error.message, error.status, and error.stack properties.
// When the request URL is for a non-existent route, the error.pug template should be displayed in the browser along with the following properties:
// error.message
// error.status
// error.stack

// Customize the style
// Change or add at least three of the following to make this project your own:
// color
// background color
// font
// box or text shadows
// transitions or animations
// add a logo
// Your can either add your changes to the end of the CSS file or add your own and link it in the head of the layout.pug file, below the other CSS links.
// Document your style changes in your README.md file and the project submission notes.
// Do not alter the layout or position of the important elements on the page.
