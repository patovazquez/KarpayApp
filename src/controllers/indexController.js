const path = require('path');

module.exports = {
    index: function(req, res, next) {

        res.render('index', { title: 'Karpay' });

      },
    
      proyectos: function(req, res, next) {

        res.render('proyectos', { title: 'Karpay' });

      },
      
      novedades: async (req, res, next) => {

        res.render('novedades', { title: 'Karpay' }); 
     //try{
          //let novedades = await db.Novedades.findAll();
          //res.render ('novedades', { Novedades: novedades});
      //}catch(error){
          //res.send(error);
     // } 
    },  
    
    talleres: function(req, res, next) {

      res.render('talleres', { title: 'Karpay' });

    },
}
