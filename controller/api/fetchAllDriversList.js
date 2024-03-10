const User = require('../../model/User');

const fetchAllDrivers = async (examClass) => {
    const query = {
        $and: [
            {examClass: {$regex: new RegExp(`^${examClass}$`, "i") }},
            {appointmentId: {$exists: true}}
        ] 
    }

    return await User.find(query).populate("appointmentId"); 
}

exports.fetchDriversListAdmin = async (req, res) => {
    if(!req.body.examClass){
        req.flash("validationErrors", "Provide exam class");
        return res.redirect('/admin/driversList');
    } else{
        const driversList = await fetchAllDrivers(req.body.examClass);
   
        if(driversList.length > 0){
            req.flash("driversList", driversList);
            req.flash("data", driversList);
            return res.redirect('/admin/driversList');
        } else {
            req.flash("validationErrors", "No record found");
            return res.redirect('/admin/driversList');
        }
    }
}

exports.fetchDriversListExaminer = async (req, res) => {
    if(!req.body.examClass){
        req.flash("validationErrors", "Provide exam class");
        return res.redirect('/examiner/evaluation');
    } else{
        const driversList = await fetchAllDrivers(req.body.examClass);
        if(driversList.length > 0){
            req.flash("driversList", driversList);
            req.flash("data", driversList);
            return res.redirect('/examiner/evaluation');
        } else {
            req.flash("validationErrors", "No record found");
            return res.redirect('/examiner/evaluation');
        }
    }
}