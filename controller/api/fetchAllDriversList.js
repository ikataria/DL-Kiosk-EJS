const User = require('../../model/User');

module.exports = async (req, res) => {
    console.log(`class:`, req.body.examClass);
    if(!req.body.examClass){
        console.log(`null`);
        // return new Error('Provide exam class');
        req.flash("validationErrors", "Provide exam class");
        return res.redirect('/admin/driversList');
    } else{
        
        const query = {
            $and: [
                {examClass: {$regex: new RegExp(req.body.examClass, "i") }},
                {appointmentId: {$exists: true}}
            ] 
        }

        const driversList = await User.find(query).populate("appointmentId");
        // console.log(__filename,`fetch driverslist for exam: ${req.body.examClass}:>`, driversList);
        
        if(driversList.length > 0){
            console.log('data present');
            req.flash("driversList", driversList);
            req.flash("data", driversList);
            return res.redirect('/admin/driversList');
        } else {
            req.flash("validationErrors", "No record found");
            return res.redirect('/admin/driversList');
        }
    }
}