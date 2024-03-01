const fetchDriverDetails = require('./api/fetchDriverDetails').fetchDriverDetailsFn;

module.exports = async (req, res) => {
    console.log(__filename, 'req.session.userId:', req.session.userId);
        fetchDriverDetails(req.session.userId).then((resolve)=>{
            // console.log(`driver handler: resolve:`, resolve);
            if(resolve && resolve.userId && resolve.userId.firstName){
                res.render('driverDetails', {
                    driverData: resolve,
                    errors: req.flash("validationErrors")
                });
            }else{
                res.render("driverDetails", {
                    driverData: "",
                    errors: req.flash("validationErrors")
                });
            }
        })
        
}