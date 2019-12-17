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
app.get('/projects/:id', (req, res, next) => {
    // set the specific project based on the ID parameter
    const project = projects[req.params.id];
    if (project){
        // render the project pug file, passing in the project variable as an object. 
        res.render("project", {project})
    } else {
        const err = new Error("Not a Valid Project");
        err.status = 500;
        console.log(err.message);
        next(err);
    }
});

app.use((err,req,res,next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render("error");
})

app.use(function (req, res, next) {
    const err = new Error("404 Error - Requested page does not exist")
    err.status = 404;
    console.log(err.message);
    res.locals.error = err;
    res.status(err.status);
    res.render("error");
})

// lets listen to the port we specificed, and log a message to the console saying its running! 
app.listen(port, () => console.log(`App listening on port ${port}!`));

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
