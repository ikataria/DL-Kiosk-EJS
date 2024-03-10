module.exports = (req, res) => {
    if(!req.session.userId){
        return res.redirect('/auth/login')
    }

    let firstName = "";
    let lastName = "";
    let licenceNumber = "";
    let dob = "";
    let make = "";
    let model = "";
    let year = "";
    let plateNumber = "";
    let appointmentDate = "";
    let examClass = "";
    let appointmentTime = "";

    const data = req.flash("data")[0];

    if(typeof data != "undefined"){
        firstName = data.firstName,
        lastName = data.lastName,
        licenceNumber = data.licenceNumber,
        dob = data.dob,
        make = data.make,
        model = data.model,
        year = data.year,
        plateNumber = data.plateNumber,
        appointmentDate = data.appointmentDate;
        examClass = data.examClass;
        appointmentTime = data.appointmentTime;
    }

    res.render('bookAppointment', {
        errors: req.flash("validationErrors"),
        displayMsg: req.flash("successMsg"),
        firstName,
        lastName,
        licenceNumber,
        dob,
        make,
        model,
        year,
        plateNumber,
        appointmentDate,
        examClass,
        appointmentTime
    });
}