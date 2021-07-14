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
          res.render ('usersIndex', { users: users});
      }catch(error){
          res.send(error);
      }
      
    },
 
    register: (req, res, next) => {

      res.render('usersRegister');
      
    },

    processRegister:async (req,res,next)=>{
      
      const errors = validationResult(req);

      if (!errors.isEmpty()) {

        return res.render('usersRegister', {errors: errors.array(), old: req.body})
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
    edit: async (req,res)=>{
    
              try{
                const oneUser = await db.User.findByPk(req.params.id)         
                                  
                res.render('userEdit',{oneUser: oneUser})
              
              }catch(error){
                  res.send(error);
              }
  }, 
  update: async (req,res) =>{
      const errors = validationResult(req);
      const oneUser = await db.User.findByPk(req.params.id);  
      let imagePath = path.join(__dirname, '../../public/images/users/' + oneUser.image);      
            
      if (!errors.isEmpty()) {                        
       
          let old = {
              ...req.body,
              id: req.params.id              
          }
          return res.render('userEdit', {errors: errors.array(), oneUser: old})
      }else{


          let editedUser = {
              ...req.body,                     
              password: bcrypt.hashSync(req.body.password, 10),
          }
          if (req.file) {
            editedUser.image = req.file.filename;
          // Elimino imagen subida 
            if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath)
          }

          } else if (req.body.oldImage) {
            editedUser.image = req.body.oldImage;
          }


          try{
              await db.User.update(editedUser,{where:{id: req.params.id}})
                            
          }catch(error){
              res.send(error);
          }

          res.redirect('/admin/users');
      }
  },
  destroy: async (req,res)=> {
    let existingUser = await db.User.findByPk(req.params.id);
    let imagePath = path.join(__dirname, '../../public/images/users/' + existingUser.image);

    try{
        await db.User.destroy({ where: { id: req.params.id, } })  
       
          if(fs.existsSync(imagePath)){
              fs.unlinkSync(imagePath)}
                      
        
    }catch(error){
        res.send(error);
    }
    
    res.redirect('/admin/users/');
    
  },
    
    

}
