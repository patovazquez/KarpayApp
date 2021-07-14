const path = require('path');
const fs = require('fs');
const db = require(path.join('..','db','models'));
const { Op, where } = require('sequelize');
const { body, validationResult } = require('express-validator');

module.exports = {

    index: async (req, res, next) => {

        
      try{
          let talleres = await db.Talleres.findAll();
          res.render ('talleresIndex', { Talleres: talleres});
      }catch(error){
          res.send(error);
      } 
      
    },

    register: (req, res, next) => {

        res.render('talleresForm');
        
    },

    processRegister:async (req,res,next)=>{
      
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
  
          return res.render('talleresForm', {errors: errors.array(), old: req.body})
        } 
        try{
          await db.Talleres.create({
            title: req.body.title,
            resume: req.body.resume,
            description: req.body.description,            
            image: req.file.filename,
            created_user_id: req.session.userId,
          });
          console.log(req.body)
          
        }catch(error){
          res.send(error)
          console.log(error)
        }      
        return res.redirect('/admin/talleres');
        
    },

    detail: async (req,res)=>{
        let id = (req.params.id);
        try{
            let oneTaller = await db.Talleres.findByPk(id);
            if(oneTaller == null){
                res.send("404 not found")
            }else{
            res.render('tallerDetail',{ oneTaller });
            }
        }catch(error){
            res.send(error);
        }

    },
    edit: async (req,res)=>{
    
        try{
          const oneTaller = await db.Talleres.findByPk(req.params.id)         
                            
          res.render('tallerEdit',{oneTaller: oneTaller})
        
        }catch(error){
            res.send(error);
        }
    },
   /* update: async (req,res) =>{
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
            let old = {
                ...req.body,
                id: req.params.id              
            }
            return res.render('tallerEdit', {errors: errors.array(), oneTaller: old})
        }else{
            let editedTaller = {
                ...req.body,
                image: req.file.filename,                
            }
  
            try{
                await db.Talleres.update(editedTaller,{where:{id: req.params.id}})
            }catch(error){
                res.send(error);
            }
  
            res.redirect('/admin/talleres/');
        }
    },
    destroy: async (req,res)=> {

        try{
            await db.Talleres.destroy({
                where: {
                    id: req.params.id,
                }
              });      
            
        }catch(error){
            res.send(error);
        }
        res.redirect('/admin/talleres/');
        
      },*/
      update: async (req,res) =>{
        const errors = validationResult(req);
        const oneTaller = await db.Talleres.findByPk(req.params.id);  
        let imagePath = path.join(__dirname, '../../public/images/talleres/' + oneTaller.image);      
              
        if (!errors.isEmpty()) {                        
         
            let old = {
                ...req.body,
                id: req.params.id              
            }
            return res.render('tallerEdit', {errors: errors.array(), oneTaller: old})
        }else{
  
  
            let editedTaller = {
                ...req.body,                     
               
            }
            if (req.file) {
              editedTaller.image = req.file.filename;
            // Elimino imagen subida 
              if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath)
            }
  
            } else if (req.body.oldImage) {
              editedTaller.image = req.body.oldImage;
            }
  
  
            try{
                await db.Talleres.update(editedTaller,{where:{id: req.params.id}})
                              
            }catch(error){
                res.send(error);
            }
  
            res.redirect('/admin/talleres');
        }
    },    
    destroy: async (req,res)=> {
    let existingTaller = await db.Talleres.findByPk(req.params.id);
    let imagePath = path.join(__dirname, '../../public/images/talleres/' + existingTaller.image);

    try{
        await db.Talleres.destroy({ where: { id: req.params.id, } })  
       
          if(fs.existsSync(imagePath)){
              fs.unlinkSync(imagePath)}
                      
        
    }catch(error){
        res.send(error);
    }
    
    res.redirect('/admin/talleres/');
    
  },
        
        
    
    
  

}


