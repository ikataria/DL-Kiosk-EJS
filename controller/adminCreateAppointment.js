module.exports = (req, res) => {
    if(!req.session.adminId){
        return res.redirect('/auth/login');
    }
    res.render('createAppointment', {
        errors: req.flash("validationErrors")
    })
}