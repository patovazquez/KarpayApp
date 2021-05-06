var express = require('express');
var router = express.Router();
const path = require('path');
var multer  = require('multer');
var validations = require(path.join(__dirname,'..','middlewares','validaciones.js'));
var usersPass = require(path.join(__dirname,'..' ,'middlewares', 'usersPass.js'));


//Configuracion de multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/../../public/images/talleres');
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

var talleresController = require(path.join(__dirname,'..','controllers','talleresController'));


/* rutas GET */
router.get('/', usersPass, talleresController.index);
router.get('/register',usersPass, talleresController.register);
router.get('/edit/:id',usersPass, talleresController.edit);
router.get('/detail/:id', talleresController.detail);

/*Rutas POST */ 
router.post('/register',usersPass, upload.single('workshop_img'),validations.novedades,talleresController.processRegister);
router.put('/edit/:id',usersPass, upload.single('workshop_img'),validations.novedades,talleresController.update);
router.delete('/delete/:id',usersPass, talleresController.destroy); 


module.exports = router;