module.exports = (req, res) => {
    // res.render('examinerEvaluationPage');
    res.render('examinerEvaluationPage', {
        errors: req.flash("validationErrors"),
        drivers: req.flash("data")
    });
}