var express = require('express');
var router = express.Router();
const path = require('path');
var indexController = require(path.join(__dirname,'..','controllers','indexController'));

/* GET home page. */
router.get('/', indexController.index)

module.exports = router;
