var express = require('express');
var router = express.Router();

router.get('/proyectos', function(req, res, next) {
  res.render('proyectos', { title: 'Proyectos' });
});

module.exports = router;
