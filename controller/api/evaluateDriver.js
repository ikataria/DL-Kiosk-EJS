const User = require('../../model/User');

module.exports = async (req, res) => {
    try{

        const isDriverEvaluated = await User.findOne({$and:[{_id: req.body.userId}, {isPassed : {$exists: true}}]});

        console.log(`isDriverEvaluated::?`, isDriverEvaluated);
        if(isDriverEvaluated){
            req.flash("validationErrors", "Driver already evaluated");
            return res.redirect('/examiner/evaluation');
        } else {
            const updatedUser = await User.findOneAndUpdate({_id: req.body.userId}, {isPassed: req.body.isPassed, comment: req.body.comment}, {new: true});
            console.log(__filename,`updatedUser:>>>`, updatedUser);
    
            req.flash("successMsg", "Driver details updated");
            return res.redirect('/examiner/evaluation');
        }
    }catch(err){
        console.log(__filename, err);
        req.flash("validationErrors", "Something went wrong. Please try again later");
        res.redirect('/examiner/evaluation');
    }
}