const path = require('path');
const fs = require('fs');
const db = require(path.join('..','db','models'));
const { Op, where } = require('sequelize');
const { body, validationResult } = require('express-validator');

module.exports = {

    index: async (req, res, next) => {

        //res.render('novedades');
      try{
          let novedades = await db.Novedades.findAll();
          res.render ('novedadesIndex', { Novedades: novedades});
      }catch(error){
          res.send(error);
      } 
      
    },

    register: (req, res, next) => {

        res.render('novedadesForm');
        
    },

    processRegister:async (req,res,next)=>{
      
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
  
          return res.render('novedadesForm', {errors: errors.array(), old: req.body})
        } 
        try{
          await db.Novedades.create({
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
        return res.redirect('/admin/novedades');
        
    },

    detail: async (req,res)=>{
        let id = (req.params.id);
        try{
            let oneNovedad = await db.Novedades.findByPk(id);
            if(oneNovedad == null){
                res.send("404 not found")
            }else{
            res.render('novedadDetail',{ oneNovedad });
            }
        }catch(error){
            res.send(error);
        }

    },
    edit: async (req,res)=>{
    
        try{
          const oneNovedad = await db.Novedades.findByPk(req.params.id)         
                            
          res.render('novedadEdit',{oneNovedad: oneNovedad})
        
        }catch(error){
            res.send(error);
        }
    },
    update: async (req,res) =>{
        const errors = validationResult(req);
        const oneNovedad = await db.Novedades.findByPk(req.params.id);  
        let imagePath = path.join(__dirname, '../../public/images/novedades/' + oneNovedad.image);      
              
        if (!errors.isEmpty()) {                        
         
            let old = {
                ...req.body,
                id: req.params.id              
            }
            return res.render('novedadEdit', {errors: errors.array(), oneNovedad: old})
        }else{
  
  
            let editedNovedad = {
                ...req.body,                     
               
            }
            if (req.file) {
              editedNovedad.image = req.file.filename;
            // Elimino imagen subida 
              if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath)
            }
  
            } else if (req.body.oldImage) {
              editedNovedad.image = req.body.oldImage;
            }
  
  
            try{
                await db.Novedades.update(editedNovedad,{where:{id: req.params.id}})
                              
            }catch(error){
                res.send(error);
            }
  
            res.redirect('/admin/novedades');
        }
    },    
    destroy: async (req,res)=> {
    let existingNovedad = await db.Novedades.findByPk(req.params.id);
    let imagePath = path.join(__dirname, '../../public/images/novedades/' + existingNovedad.image);

    try{
        await db.Novedades.destroy({ where: { id: req.params.id, } })  
       
          if(fs.existsSync(imagePath)){
              fs.unlinkSync(imagePath)}
                      
        
    }catch(error){
        res.send(error);
    }
    
    res.redirect('/admin/novedades/');
    
  },
        
    
    
  

}