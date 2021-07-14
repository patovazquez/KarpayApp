var express = require('express');
var router = express.Router();
const path = require('path');
var indexController = require(path.join(__dirname,'..','controllers','indexController'));

/* GET home page. */
router.get('/', indexController.index)
router.get('/proyectos', indexController.proyectos)
router.get('/novedades', indexController.novedades)
router.get('/talleres', indexController.talleres)
router.get('/quienessomos', indexController.somos)
router.get('/concienciaSaludable', indexController.saludable)
router.get('/conexionpachamama', indexController.pachamama)
router.get('/experienciaUbuntu', indexController.ubuntu)
router.get('/detalle/:id', indexController.detail)
router.get('/privacidad', indexController.privacidad)

router.post ('/sendEmail', indexController.contact)

module.exports = router;
