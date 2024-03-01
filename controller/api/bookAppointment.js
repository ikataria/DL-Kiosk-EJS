const User = require('../../model/User');
const Appointment = require('../../model/Appointment');

module.exports = async (req, res) => {
    try{
        if(!req.body.firstName || !req.body.lastName || !req.body.licenceNumber || !req.body.dob || !req.body.make || !req.body.model || !req.body.year || !req.body.plateNumber || !req.body.appointmentDate || !req.body.examClass || !req.body.appointmentTime){
            console.log(`body:`, req.body);

            req.flash("validationErrors", "Please provide all details");
            req.flash("data", req.body)       
            return res.redirect('/user/bookAppointment');
        }else{
            console.log(`body:`, req.body);
            const firstName = req.body.firstName.trim();
            const lastName = req.body.lastName.trim();
            const licenceNumber = req.body.licenceNumber.trim();
            const dob = req.body.dob.trim();
            const make = req.body.make.trim();
            const model = req.body.model.trim();
            const year = req.body.year.trim();
            const plateNumber = req.body.plateNumber.trim();
            const appointmentDate = req.body.appointmentDate.trim();
            const examClass = req.body.examClass.trim();
            const appointmentTime = req.body.appointmentTime.trim();

            const updateObj = {
                firstName,
                lastName,
                licenceNumber,
                dob,
                carDetails:{
                    make,
                    model,
                    year,
                    plateNumber
                },
                appointmentDate,
                examClass,
                appointmentTime
            }

            console.log(`b4 update`);
            await User.findOneAndUpdate({_id: req.session.userId}, updateObj, {new: true});
            await Appointment.findOneAndUpdate({$and: [{appointmentDate, appointmentTime}]}, {isTimeSlotAvailable: false, userId: req.session.userId})
            console.log(`Slot booked:`);

            req.flash("validationErrors", "Slot booked successfully");
            res.redirect('/user/driverDetails');
        }
    }catch(err){
        console.log(__filename,err);
        req.flash("validationErrors", "Something went wrong, please try again later");
        res.redirect('/user/bookAppointment');
    }
}