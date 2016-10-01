'use strict';
var express = require('express');
var router = express.Router();

/* GET meetup specifyc. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* GET meetups listing. */
router.get('/list', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;