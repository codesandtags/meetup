var express = require('express');
var router = express.Router();
var labels = require('../dist/i18n/en/labels');

/* GET home page. */
router.get('/', function(req, res, next) {
    var content = {
        labels: labels,
        meetups: [
            {
                title: "Let's see the Sunset",
                img: "images/events/beach.jpg",
                abstract: "We are going to see the sunset drinking some beers. Please confirm before to go the event...",
                description: "We are going to see the sunset drinking some beers, also we want to dance and talk about our experiences. Please confirm before to go the event",
                date: "Wednesday, Aug 17",
                hour: "7:00 PM",
                address: {
                    street: "Carrera 7 # 54-14",
                    buildingName: "Atom House"
                },
                city: "Bogota",
                price: "Free",
                availability: "20 - 30"
            },
            {
                title: "Let's see the Sunset",
                img: "images/events/hiking.jpg",
                abstract: "We are going to see the sunset drinking some beers. Please confirm before to go the event...",
                description: "We are going to see the sunset drinking some beers, also we want to dance and talk about our experiences. Please confirm before to go the event",
                date: "Wednesday, Aug 17",
                hour: "7:00 PM",
                address: {
                    street: "Carrera 7 # 54-14",
                    buildingName: "Atom House"
                },
                city: "Bogota",
                price: "Free",
                availability: "20 - 30"
            },
            {
                title: "Let's see the Sunset",
                img: "images/events/picnic.jpg",
                abstract: "We are going to see the sunset drinking some beers. Please confirm before to go the event...",
                description: "We are going to see the sunset drinking some beers, also we want to dance and talk about our experiences. Please confirm before to go the event",
                date: "Wednesday, Aug 17",
                hour: "7:00 PM",
                address: {
                    street: "Carrera 7 # 54-14",
                    buildingName: "Atom House"
                },
                city: "Bogota",
                price: "Free",
                availability: "20 - 30"
            },
            {
                title: "Let's see the Sunset",
                img: "images/events/yoga.jpg",
                abstract: "We are going to see the sunset drinking some beers. Please confirm before to go the event...",
                description: "We are going to see the sunset drinking some beers, also we want to dance and talk about our experiences. Please confirm before to go the event",
                date: "Wednesday, Aug 17",
                hour: "7:00 PM",
                address: {
                    street: "Carrera 7 # 54-14",
                    buildingName: "Atom House"
                },
                city: "Bogota",
                price: "Free",
                availability: "20 - 30"
            },
            {
                title: "Let's see the Sunset",
                img: "images/events/beach.jpg",
                abstract: "We are going to see the sunset drinking some beers. Please confirm before to go the event...",
                description: "We are going to see the sunset drinking some beers, also we want to dance and talk about our experiences. Please confirm before to go the event",
                date: "Wednesday, Aug 17",
                hour: "7:00 PM",
                address: {
                    street: "Carrera 7 # 54-14",
                    buildingName: "Atom House"
                },
                city: "Bogota",
                price: "Free",
                availability: "20 - 30"
            }
        ]

    };

    res.render('index', content);
});


router.get('/sign-in', function(req, res, next) {
    var content = {
        labels: labels
    };

    res.render('signin', content);

});


module.exports = router;
