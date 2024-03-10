const User = require('../../model/User');

module.exports = async (req, res) => {
    try{
        const userData = await User.findById(req.session.userId);

        if(req.body.make === userData.carDetails.make &&  req.body.model === userData.carDetails.model && req.body.year === userData.carDetails.year.toISOString().split('T')[0] &&  req.body.plateNumber === userData.carDetails.plateNumber ){
            req.flash("validationErrors","Nothing to update");
            res.redirect('/user/driverDetails');
        } else {
            let updateObj = {
                "carDetails.make": req.body.make ? req.body.make.toUpperCase().trim() : userData.carDetails.make,
                "carDetails.model": req.body.model ? req.body.model.toUpperCase().trim() : userData.carDetails.model,
                "carDetails.year": req.body.year ? req.body.year : userData.carDetails.year,
                "carDetails.plateNumber": req.body.plateNumber ? req.body.plateNumber.toUpperCase().trim() : userData.carDetails.plateNumber  
            }

            await User.findOneAndUpdate({_id: req.session.userId}, updateObj, {new: true});

            req.flash("successMsg", "Details updated");
            res.redirect('/user/driverDetails');
        }
    }catch(err){
        console.log(__filename, err);
        req.flash("validationErrors", "Something went wrong");
        res.redirect("/user/driverDetails");
    }

}