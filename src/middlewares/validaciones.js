const { body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

//Configuracion de sequelize
const db = require(path.join('..','db','models'));
const { Op, where } = require("sequelize");

module.exports = {
    register: [
        body('email').custom(async (value) => {

            let user = (await db.User.findOne({where: {email: value}}))
            if (user != null) {
                throw new Error('El email ingresado ya se encuentra registrado');
              }
              return true;
        }),

        body('first_name')
        .isLength({ min: 2 })
        .withMessage("El campo de nombre debe tener 2 caracteres como minimo"),

        body('last_name').
        isLength({ min: 2 })
        .withMessage("El campo de apellido debe tener 2 caracteres como minimo"),
        
        body('email')
        .isEmail()
        .withMessage("Ingrese un email valido"),
        
        body('password')
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener 8 caracteres como minimo"),

        body('user_img')
        .custom((value,{req}) => req.file) //Si no existe req.file la verificacion no va a pasar
        .withMessage("La imagen no es valida o no se ha elegido ninguna"),

        body('passwordCheck').
        custom((value,{req}) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
              }
              return true;
        })

    ],

    login:[

        body('email')
        .isEmail(),

        body('password')
        .isLength({ min: 8 })

    ],
    /*product:[
        body('title')
        .isLength({ min: 2 })
        .withMessage("El campo de nombre debe tener 2 caracteres como minimo"),

        body('price').custom((value) => !isNaN(value))
        .withMessage("Ingrese un precio valido"),

        body('description')
        .notEmpty()
        .withMessage("El campo de descripcion no puede estar vacio"),

        body('category_id')
        .notEmpty()
        .withMessage("Seleccione una categoria"),

        body('product_img')
        .custom((value,{req}) => req.file) //Si no existe req.file la verificacion no va a pasar
        .withMessage("La imagen no es valida o no se ha elegido ninguna")

    ]*/
}