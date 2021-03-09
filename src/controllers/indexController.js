const path = require('path');

module.exports = {
    index: function(req, res, next) {

        res.render('index', { title: 'Karpay' });

      },
    
}
