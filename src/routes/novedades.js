var express = require('express');
var router = express.Router();
const path = require('path');
var multer  = require('multer');
var validations = require(path.join(__dirname,'..','middlewares','validaciones.js'));
var usersPass = require(path.join(__dirname,'..' ,'middlewares', 'usersPass.js'));


//Configuracion de multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/../../public/images/novedades');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   //Aca configuramos para que no acepte cualquier tipo de archvios y acepte solamente esas extensiones
  var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
      }
    }
  });
//Fin de la configuracion de multer

var novedadesController = require(path.join(__dirname,'..','controllers','novedadesController'));


/* rutas GET */
router.get('/', usersPass, novedadesController.index);
router.get('/register',usersPass, novedadesController.register);
router.get('/edit/:id',usersPass, novedadesController.edit);
router.get('/detail/:id', novedadesController.detail);

/*Rutas POST */ 
router.post('/register',usersPass, upload.single('news_img'),validations.novedades,novedadesController.processRegister);
router.put('/edit/:id',usersPass, upload.single('news_img'),validations.editNovedades,novedadesController.update);
router.delete('/delete/:id',usersPass, novedadesController.destroy); 


module.exports = router;