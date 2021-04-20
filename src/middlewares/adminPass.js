module.exports = (req,res,next) =>{
    
    if(req.session.tipe == 'Visit'){
        res.redirect('/');
    }else if(req.session.tipe == 'Colab'){
        res.redirect('/admin/dashboard');
    }else if(!req.session.tipe){
        res.redirect('/');
    }else {
        next();
    }





}