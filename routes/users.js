var express = require('express');
var router = express.Router();
var firebase = require("firebase");

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "AIzaSyDL70y7VLlY8jWFkXT5eSpNcUa1kignd_E",
    authDomain: "meetup-e1533.firebaseapp.com",
    databaseURL: "https://meetup-e1533.firebaseio.com",
    storageBucket: "meetup-e1533.appspot.com",
};
firebase.initializeApp(config);

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(buildResponse(200, 'URL is not available'));
});

/* TODO: POST users login. */
router.post('/login', function(req, res, next) {
    var account = req.body,
        userId = generateHash(account.email);

    res.send(account);

});

/* TODO: POST users logout. */
router.post('/logout', function(req, res, next) {
    var account = req.body;

    res.send(account);
});

/* TODO: POST users signup. */
router.post('/signup', function(req, res, next) {
    var account = req.body,
        userId = firebase.database().ref().child('users').push().key;

    console.log('userId : ' + userId);

    firebase.database().ref('users/' + userId).set({
        names: account.names,
        email: account.email,
        password: account.password
    });

    res.send(account);
});


function buildResponse(status, message) {
    return {
        "status": status,
        "message": message
    };
}

function generateHash(data) {
    return data.split("").reduce(function(a, b) {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a
    }, 0);
}

module.exports = router;
