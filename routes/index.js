var express = require('express');
var router = express.Router();
var labels = require('../dist/i18n/en/labels');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {"labels":labels});
});

module.exports = router;
