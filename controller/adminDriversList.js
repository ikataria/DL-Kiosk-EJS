module.exports = (req, res) => {
    res.render('adminDriversList', {
        errors: req.flash("validationErrors"),
        drivers: req.flash("data")
    });
}