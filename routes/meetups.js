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
                meetup.eventStartDate = getEventFormatDate(meetup.eventStartDate);
                meetup.eventEndDate = getEventFormatDate(meetup.eventEndDate);
                meetup.eventCost = (meetup.eventCost === '0') ? 'Free' : meetup.eventCost;
                meetup.eventGuest = getTextEventGuestList(meetup.eventGuest);

                meetupList.push(meetup);
            }

            res.send(meetupList);
        });

    //res.send('Doing something');
});

function getEventFormatDate(date) {
    var eventDate = new Date(date);

    return eventDate.toDateString().split(' ').splice(1).join(' ') + ', ' + eventDate.toLocaleTimeString();
}

function getTextEventGuestList(eventList) {
    var textEventList;

    switch (eventList) {
        case '0_10':
            textEventList = '1 to 10 People';
            break;
        case '10_20':
            textEventList = '10 to 20 People';
            break;
        case '20_50':
            textEventList = '20 to 50 People';
            break;
        case 'more_than_50':
            textEventList = 'More than 50 People';
            break;
        default:
            textEventList = 'N/A';
    }

    return textEventList;
}


router.post('/create', function(req, res) {
    sess = req.session;

    if (sess && sess.user) {
        var meetup = req.body;

        meetup.userId = sess.user.uid;
        meetup.eventStarDate = meetup.eventStartDate.replace('T', ' ');
        meetup.eventEndDate = meetup.eventEndDate.replace('T', ' ');

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
