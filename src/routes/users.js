var express = require('express');
var router = express.Router();
const path = require('path');
var multer  = require('multer');
var validations = require(path.join(__dirname,'..','middlewares','validaciones.js'));
var adminPass = require(path.join(__dirname,'..' ,'middlewares', 'adminPass.js'));


//Configuracion de multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/../../public/images/users'); 
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



var usersController = require(path.join(__dirname,'..','controllers','usersController'));


/* rutas GET */
router.get('/',adminPass, usersController.index);
router.get('/register',adminPass, usersController.register);
router.get('/edit/:id',adminPass,usersController.edit);

/* rutas POST */
router.post('/register',adminPass, upload.single('user_img'),validations.register,usersController.processRegister);
router.put('/edit/:id',adminPass, upload.single('user_img'),validations.editUser,usersController.update);
router.delete('/delete/:id',adminPass, usersController.destroy); 

module.exports = router; 