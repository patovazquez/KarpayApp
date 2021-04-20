const path = require('path');
const fs = require('fs');
const db = require(path.join('..','db','models'));
const { Op, where } = require('sequelize');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');


module.exports = {

    index: async (req, res, next) => {
      try{
          let users = await db.User.findAll();
          res.json (users);
      }catch(error){
          res.send(error);
      }
      
    },
 
    register: (req, res, next) => {

      res.render('register');
      
    },

    processRegister:async (req,res,next)=>{
      
      const errors = validationResult(req);

      if (!errors.isEmpty()) {

        return res.render('register', {errors: errors.array(), old: req.body})
      } 
      try{
        await db.User.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          image: req.file.filename,
          tipe: req.body.tipe
        });
        console.log(req.body)
        
      }catch(error){
        res.send(error)
        console.log(error)
      }      
      return res.redirect('/admin/users');
      
    },
    
    

}
