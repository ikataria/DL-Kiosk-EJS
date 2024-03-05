module.exports = (req, res) => {
    
    // if(req.flash("data")){
    //     const data = req.flash("data");
    // }
    // console.log(__filename,"driversdata:", req.flash("data"));

    res.render('adminDriversList', {
        errors: req.flash("validationErrors"),
        drivers: req.flash("data")
    });
}