const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
let createError = require('http-errors');
let path = require('path');
let favicon = require('serve-favicon')
let cookieParser = require('cookie-parser');
let express = require('express');
let logger = require('morgan');
let expressHandlebars = require('express-handlebars')
let mongoose = require('mongoose')
let session = require('express-session')
let passport = require('passport')
let flash = require('connect-flash')

let indexRouter = require('./routes/index');

let app = express();

mongoose.connect('mongodb://localhost:27017/shopping', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true }, (err) => {
    if (err) {
        return console.log(err);
    } else {
        console.log("Server is connected to database...")
    }
});
require('./config/passport')
    // view engine setup
const hbs = expressHandlebars.create({
    defaultLayout: 'layout',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'mysupersecret', resave: false, saveUninitialized: false }))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;