const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const port = 8000;

const expressLayouts = require('express-ejs-layouts');
// express layouts for ejs 


// database connection
const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongodb-session')(session);
const sassMiddleware = require('node-sass-middleware');


// middlewares
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));


app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('assets'));
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);





// setting up view engines-ejs
app.set('view engine', 'ejs');
app.set('views', './views');


// session cookies
// mongo store is used to store session cookie in db
app.use(session({
    name: 'ConnectI',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
            uri: 'mongodb://localhost/ConnectI_db',
            collection: 'mysessions',
            autoRemove: 'disabled'
        },
        function(err) {
            console.log(err || "connect mongo setup okay");
        })

}));

// using passport 
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);



// Use express router
app.use('/', require('./routes/index'));



app.listen(port, function(err) {
    if (err) {
        console.log(`Error is ${err} on port ${port}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
});