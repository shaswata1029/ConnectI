const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const port = 8000;

const expressLayouts = require('express-ejs-layouts');
// express layouts for ejs 


// database connection
const db = require('./config/mongoose');



// middlewares
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('assets'));
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Use express router
app.use('/', require('./routes/index'));


// setting up view engines-ejs
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err) {
    if (err) {
        console.log(`Error is ${err} on port ${port}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
});