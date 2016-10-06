var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-hbs');
var handlebars = require('handlebars');
var labels = require('./app/i18n/en/labels');

var routes = require('./routes/index');
var users = require('./routes/users');
var meetups = require('./routes/meetups');

var app = express();

//uncomment the next line if you want to use jade engine
//app.set('view engine', 'jade');

//Handlebars engine template
/*
 app.engine('hbs', hbs.express4({
 //partialsDir   : __dirname +'/dist/views/partials',
 defaultLayout : __dirname +'/dist/views/index',
 extname       : '.hbs',
 layoutsDir    : __dirname +'/dist/views/',
 }));
 */
// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
    partialsDir: path.join(__dirname, 'app/views/partials')
}));
app.set('view engine', 'hbs');
// view engine setup
app.set('views', path.join(__dirname, 'app/views'));

hbs.registerHelper('ifCond', function(v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});


// uncomment after placing your favicon in /dist
//app.use(favicon(__dirname + '/dist/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use(favicon(__dirname + '/dist/favicon.ico'));

app.use('/', routes);
app.use('/api/users', users);
app.use('/api/meetups', meetups);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            labels: labels,
            message: 'Page ' + req.path + ' ' + err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        labels: labels,
        message: err.message,
        error: {}
    });
});


module.exports = app;
