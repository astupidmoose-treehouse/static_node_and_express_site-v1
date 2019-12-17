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
    // check if the project was set (valid) and render the appropriate page if so
    if (project){
        // render the project pug file, passing in the project variable as an object. 
        res.render("project", {project})
    // if the project was not set, its false and we need to throw an error
    } else {
        // create a new error
        const err = new Error("Not a Valid Project");
        // set the status to 500
        err.status = 500;
        // log the error to the console in a friendly way
        console.log(err.message);
        // send error to the error handler
        next(err);
    }
});

// create an error handler
app.use((err,req,res,next) => {
    // set the response locals error to the error we received from the last middleware function
    res.locals.error = err;
    // the response status is set to the error status
    res.status(err.status);
    // render the error page
    res.render("error");
})

// create a 404 error handler. According to the docs, this is the last handler, if nothing else is caught
app.use(function (req, res, next) {
    // create a new 404 error
    const err = new Error("404 Error - Requested page does not exist")
    // set the error status to 404
    err.status = 404;
    // log an error to the console in a friendly message
    console.log(err.message);
    // set the error to the error object
    res.locals.error = err;
    // the response status is set to the error status
    res.status(err.status);
    // render the error page
    res.render("error");
})

// lets listen to the port we specificed, and log a message to the console saying its running! 
app.listen(port, () => console.log(`App listening on port ${port}!`));
