var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var firebaseConfig = require("../firebase.config.js");
var CONSTANTS = firebaseConfig.CONSTANTS;

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
    var account = req.body,
        userId = generateHash(account.email);

    res.send(account);

});

router.post('/logout', function(req, res, next) {
    var account = req.body;

    res.send(account);
});

router.post('/signup', function(req, res) {
    var account = req.body,
        users = firebase.database().ref(CONSTANTS.REFS.USERS);

    // Validates if the user already exists
    if (account) {
        console.log('validating users...');
        users
            .equalTo(account.email)
            .orderByChild('email')
            .once('value')
            .then(function(snapshot) {
                console.log('Value ==>', snapshot.val());
                if (snapshot.val() === null) {
                    // Create a new User
                    users.push().set({
                        names: account.names,
                        email: account.email,
                        password: account.password
                    });

                    res.send(buildResponse(200, 'User created successfully'));

                } else {
                    res.send(buildResponse(400, 'The user already exists.'));
                }
            });
    }
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
