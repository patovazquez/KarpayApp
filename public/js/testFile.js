
update: async (req, res) => {
    let errors = validationResult(req);
    console.log(errors.mapped());

    if(!errors.isEmpty()) {
      // Elimino imagen subida
      if(req.file) {
        let imagePath = path.join(__dirname, '../public/img/' + req.file.filename);
  
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath)
        }
      }

      let sizes = await size.findAll();
      let toasts = await toast.findAll();
      let roasts = await roast.findAll();

      return res.render('products/edit', {
        sizes,
        toasts,
        roasts,
        errors: errors.mapped(),
        product: req.body 
      });
    }

      let updatedProduct = req.body;
      
      if (req.file) {
        updatedProduct.image = req.file.filename;
      } else if (req.body.oldImage) {
        updatedProduct.image = req.body.oldImage;
      }
      delete updatedProduct.oldImage;

      product.update(updatedProduct, {
        where: {
          id: req.params.id
        }
      })
        .then(updatedProduct => {
          return res.redirect('/products/' + req.params.id);
        })
        .catch(error => {
          console.log(error);
          return res.render('/');
        })
  }
