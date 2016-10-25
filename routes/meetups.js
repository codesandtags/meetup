'use strict';
var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var firebaseConfig = require("../firebase.config.js");
var CONSTANTS = firebaseConfig.CONSTANTS;
var sess;


/* GET meetup specifyc. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* GET meetups listing. */
router.get('/list', function(req, res, next) {

    firebase.database()
        .ref(CONSTANTS.REFS.MEETUPS)
        .once('value')
        .then(function(snapshot) {
            var meetups = snapshot.val(),
                meetupList = [];

            for (var meetupId in meetups) {
                var meetup = meetups[meetupId];
                meetup.id = meetupId;

                meetupList.push(meetup);
            }

            res.send(meetupList);
        });

    //res.send('Doing something');
});


router.post('/create', function(req, res) {
    sess = req.session;

    if (sess && sess.user) {
        var meetup = req.body;

        console.log('Session:', sess);
        console.log('Creando usuario', meetup);
        console.log(meetup.eventStartDate);

        meetup.userId = sess.user.uid;
        meetup.eventStarDate = meetup.eventStartDate.replace('T', ' ');
        meetup.eventEndDate = meetup.eventEndDate.replace('T', ' ');
        console.log(meetup);

        firebase
            .database()
            .ref(CONSTANTS.REFS.MEETUPS).push()
            .set(meetup);

        res.send(buildResponse(200, 'Meetup created successful'));
    } else {
        console.log('No está autenticado');
        return buildResponse(401, 'User Unauthorized');
    }

});

function buildResponse(status, message) {
    return {
        "status": status,
        "message": message
    };
}

module.exports = router;
