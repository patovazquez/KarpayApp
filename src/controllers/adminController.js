const { body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const db = require(path.join('..','db','models'));
const { Op, where } = require('sequelize');
const bcrypt = require('bcrypt');


module.exports = {
    login: function(req, res, next) {

        res.render('adminLogIn', { title: 'Karpay' });

      },
      
    dashBoard: function(req, res, next) {

      res.render('dashBoard', { title: 'Tablero' });

    },

    processLogin: async (req,res,next) =>{
      const errors = validationResult(req);

      if (!errors.isEmpty()){
         res.render('adminlogin', {error:true, old: req.body})
      }else{

        try{
          let users = await db.User.findAll();
          let userLogin = users.find(element => element.email === req.body.email);

          if(userLogin && (bcrypt.compareSync(req.body.password, userLogin.password)) ){
            req.session.email = userLogin.email;
            req.session.userId = userLogin.id;
            req.session.image = userLogin.image;
            req.session.tipe = userLogin.tipe;   
            
    
            res.redirect('admin/dashboard');
          }
    
          else {
            res.render('adminLogin', {error:true, old: req.body})
            
          }
    
           
        }catch(error){
          res.send(error)
        }

      }

    },

    logout: (req,res)=>{
      req.session.destroy();
      
      res.redirect('/');
    },


        

}
