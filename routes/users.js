var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var firebaseConfig = require("../firebase.config.js");
var CONSTANTS = firebaseConfig.CONSTANTS;
var sess;

firebase.initializeApp(firebaseConfig.getConfig());

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send(buildResponse(200, 'URL is not available'));
});

/* GET user by ID. */
router.get('/:userId', function(req, res, next) {
    var userId = req.params.userId;

    if (userId) {
        return firebase.database().ref(CONSTANTS.REFS.USERS + '/' + userId).once('value')
            .then(function(snaptshot) {
                var user = snaptshot.val();

                if (user === null) {
                    throw new Error('User does not exists');
                }

                user.id = userId;
                res.send(user);
            })
            .catch(function(reason) {
                res.send(buildResponse(400, reason.toString()));
            });
    }

});

router.post('/login', function(req, res, next) {
    var account = req.body;
    sess = req.session;

    firebase.auth().signInWithEmailAndPassword(account.email, account.password)
        .then(function(data) {
            var user = {
                displayName: data.displayName,
                email: data.email,
                photoURL: data.photoURL,
                uid: data.uid
            };

            console.log('user', user);
            sess.isAuth = true;
            sess.user = user;
            res.send(user);
        })
        .catch(function(error) {
            // Handle Errors here.
            console.log('error : ', error);
            res.send(error);
        });
});

router.post('/signup', function(req, res) {
    var account = req.body;

    console.log(account);

    firebase.auth().createUserWithEmailAndPassword(account.email, account.password)
        .then(function(data) {
            var user;
            // If the user is created then I retrieve the basic information
            data.updateProfile({
                displayName: account.firstName + ' ' + account.lastName,
                photoURL: "/images/user_profile.png"
            }).then(function() {
                console.log('datos del user', data);
                // If i have the basic information then I save the additional information
                // for the user in a new node
                firebase
                    .database()
                    .ref(CONSTANTS.REFS.USERS + '/' + data.uid)
                    .set({
                        firstName: account.firstName,
                        lastName: account.lastName,
                        country: account.country,
                        jobTitle: account.jobTitle,
                        birthday: account.birthday
                    });

                res.send(buildResponse(200, 'User created successfully'));
            });
        })
        .catch(function(error) {
            // Handle Errors here.
            console.log('error : ', error);
            res.send(error);
        });

});

router.post('/logout', function(req, res) {
    var account = req.body;

    res.send(account);
});


function buildResponse(status, message) {
    return {
        "status": status,
        "message": message
    };
}

module.exports = router;
