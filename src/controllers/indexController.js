const path = require('path');
const fs = require('fs');
const db = require(path.join('..','db','models'));
const { Op, where } = require('sequelize');


module.exports = {    

      index: async (req, res, next) => {
       
      try{
          let novedades = await db.Novedades.findAll();
          res.render ('index', { Novedades: novedades});
      }catch(error){
          res.send(error);
      } 
      
    },
      proyectos: function(req, res, next) {

        res.render('proyectos', { title: 'Karpay' });

      },
      
      novedades: async (req, res, next) => {
       
        try{
            let novedades = await db.Novedades.findAll();
            res.render ('novedades', { Novedades: novedades});
        }catch(error){
            res.send(error);
        } 
      },   
     

      talleres: async (req, res, next) => {

        
          try{
              let talleres = await db.Talleres.findAll();
              res.render ('talleres', { Talleres: talleres});
          }catch(error){
              res.send(error);
        } 
        
          
  
      },
      detail: async (req,res)=>{
        let id = (req.params.id);
        try{
            let oneTaller = await db.Talleres.findByPk(id);
            if(oneTaller == null){
                res.send("404 not found")
            }else{
            res.render('tallerDetalle',{ oneTaller });
            }
        }catch(error){
            res.send(error);
        }
      },
      somos: function(req, res, next) {

        res.render('quienesSomos', { title: 'Karpay' });

      },
      saludable: function(req, res, next) {

        res.render('concienciaSaludable', { title: 'Karpay' });

      },
      pachamama: function(req, res, next) {

        res.render('conexionPachamama', { title: 'Karpay' });

      },
      ubuntu: function(req, res, next) {

        res.render('experienciaUbuntu', { title: 'Karpay' });

      },
      privacidad: function(req, res, next) {

        res.render('privacidad', { title: 'Karpay' });

      },

      contact: async (req,res)=>{

        const nodemailer = require('nodemailer');

        const {name, email, message} = req.body;
    
        contentHTML = `
        <h2>Detalle de Contacto</h2>
        <ul>
            <li>Nombre: ${name}</li>
            <li>Email: ${email}</li>        
        </ul>
        <h3>Mesaje: </h3>
        <p>${message}</p>
        `;

        var transport = nodemailer.createTransport({
          host: "smtp.mail.yahoo.com",
          port: 465,
          service: 'yahoo',
          secure: false,
          auth: {
            user: "karpaymailer@yahoo.com",
            pass: "wfdkwdkpmvoyyomy"  //"Dz7aXRUQf6MZFNH"
          },
          debug: false,
          logger: true,
          tls: { 
            rejectUnauthorized: false
          }
        });

        const mensaje = {
          from: "'Karpay Web' <karpaymailer@yahoo.com>" ,
          to: 'comunidadkarpay@gmail.com',
          subject: "Contacto desde la Web",
          html : contentHTML,         
      };

      
      const info = await transport.sendMail(mensaje);

      console.log('message sent', info.messageId)


      // FIN DE ENVIO MAIL
        
        res.redirect("/")
    
    },
    
}
