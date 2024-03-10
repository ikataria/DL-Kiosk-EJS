const fetchDriverDetails = require('./api/fetchDriverDetails').fetchDriverDetailsFn;

module.exports = async (req, res) => {
    fetchDriverDetails(req.session.userId).then((resolve)=>{
        if(resolve && resolve.userId && resolve.userId.firstName){
            res.render('driverDetails', {
                driverData: resolve,
                errors: req.flash("validationErrors"),
                displayMsg: req.flash("successMsg")
            });
        }else{
            res.render("driverDetails", {
                driverData: "",
                errors: req.flash("validationErrors"),
                displayMsg: req.flash("successMsg")
            });
        }
    })
        
}