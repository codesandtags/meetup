var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* TODO: POST users login. */
router.get('/login', function (req, res, next) {
    res.send('login for the user');
});

/* TODO: POST users logout. */
router.get('/logout', function (req, res, next) {
    res.send('logout for the user');
});

/* TODO: POST users signup. */
router.get('/signup', function (req, res, next) {
    res.send('signup for the user');
});

module.exports = router;
