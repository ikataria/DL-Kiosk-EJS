module.exports = (req, res) => {
    if(!req.session.userId){
        return res.redirect('/auth/login')
    }
    res.render('bookAppointment');
}