module.exports = (req, res, next) => {
    if(req.session.userId){
        return res.redirect('/')
    }else if(req.session.examinerId){
        return res.redirect('/')
    }else if(req.session.adminId){
        return res.redirect('/')
    }

    next();
}