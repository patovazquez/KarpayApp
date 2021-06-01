var express = require('express');
var router = express.Router();
const path = require('path');
var indexController = require(path.join(__dirname,'..','controllers','indexController'));

/* GET home page. */
router.get('/', indexController.index)
router.get('/proyectos', indexController.proyectos)
router.get('/novedades', indexController.novedades)
router.get('/talleres', indexController.talleres)

module.exports = router;
