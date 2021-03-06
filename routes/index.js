var express = require('express');
var router = express.Router();
var labels = require('../dist/i18n/en/labels');
var sess;
var firebase = require("firebase");
var firebaseConfig = require("../firebase.config");
var request = require('request');
var http = require('http');

firebase.initializeApp(firebaseConfig.getConfig());

/* GET home page. */
router.get('/', function(req, res, next) {
    sess = req.session;

    var content = {
        labels: labels
    };

    request('http://localhost:3000/api/meetups/list', function(error, response, body) {
        var content = {
            labels: labels
        };

        if (response.statusCode === 200 && body.length) {
            content.meetups = JSON.parse(body);
        } else {
            content.meetups = [];
        }

        res.render('index', validateSession(content));
    });
});

router.get('/sign-in', function(req, res, next) {
    var content = {
        labels: labels,
        title: 'Sign In',
        activeTab: 'signin',
        activePage: labels.menu.signIn
    };
    res.render('signin', validateSession(content));
});

router.get('/sign-up', function(req, res, next) {
    var content = {
        labels: labels,
        title: 'Sign Up',
        activeTab: 'signup',
        activePage: labels.menu.signUp
    };
    res.render('signin', validateSession(content));
});

router.get('/logout', function(req, res, next) {

    req.session.destroy(function(err) {
        console.log('There is an error destroying the session');
    });

    res.redirect('/');
});


router.get('/meetups/create', function(req, res, next) {
    var content = {
        labels: labels,
        title: 'Create New Meetup',
        activePage: labels.menu.meetups
    };

    res.render('meetup', validateSession(content));
});


function validateSession(content) {
    content.isAuth = false;

    if (sess && sess.isAuth) {
        content.isAuth = true;
        content.user = sess.user;
    }
    console.log('Session en INDEX : ', sess);

    return content;
}

module.exports = router;
