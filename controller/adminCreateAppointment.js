module.exports = (req, res) => {
    if(!req.session.adminId){
        return res.redirect('/auth/login');
    }
    console.log(`req.body>>>`, JSON.stringify(req.body));
    res.render('createAppointment', {
        aptDate : req.body.appointmentDate,
        errors: req.flash("validationErrors"),
        displayMsg: req.flash("successMsg")
    })
}