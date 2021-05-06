var express = require('express');
var router = express.Router();
const path = require('path');
var validations = require(path.join(__dirname,'..','middlewares','validaciones.js'));
var adminController = require(path.join(__dirname,'..','controllers','adminController'));
var usersPass = require(path.join(__dirname,'..' ,'middlewares', 'usersPass.js'));

/* GET home page. */
router.get('/', adminController.login);
router.get('/dashboard',usersPass, adminController.dashBoard);

/*POST users listing */
router.post('/',validations.login,adminController.processLogin);
router.post('/logout',adminController.logout);


module.exports = router;
