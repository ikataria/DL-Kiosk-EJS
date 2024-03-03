const User = require('../../model/User');
const Appointment = require('../../model/Appointment');

module.exports = async (req, res) => {
    try{
        if(!req.body.firstName || !req.body.lastName || !req.body.licenceNumber || !req.body.dob || !req.body.make || !req.body.model || !req.body.year || !req.body.plateNumber || !req.body.appointmentDate || !req.body.examClass || !req.body.appointmentTime){
            req.flash("validationErrors", "Please provide all details");
            req.flash("data", req.body)       
            return res.redirect('/user/bookAppointment');
        }else{
            const firstName = req.body.firstName.toUpperCase().trim();
            const lastName = req.body.lastName.toUpperCase().trim();
            const licenceNumber = req.body.licenceNumber.toUpperCase().trim();
            const dob = req.body.dob.trim();
            const make = req.body.make.toUpperCase().trim();
            const model = req.body.model.toUpperCase().trim();
            const year = req.body.year.trim();
            const plateNumber = req.body.plateNumber.toUpperCase().trim();
            const appointmentDate = req.body.appointmentDate.trim();
            const examClass = req.body.examClass.toUpperCase().trim();
            const appointmentTime = req.body.appointmentTime.trim();

            const userDataAvailable = await User.findById(req.session.userId);

            console.log("userDataAvailable.firstName", userDataAvailable.firstName);

            if(!userDataAvailable.firstName){
                const slotDetails = await Appointment.findOne({$and: [{appointmentDate, appointmentTime}]});
                if(slotDetails && slotDetails.isTimeSlotAvailable){
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
        
                    const appointmentData = await Appointment.findOneAndUpdate({$and: [{appointmentDate, appointmentTime}]}, {isTimeSlotAvailable: false, userId: req.session.userId})
                    updateObj["appointmentId"] =  appointmentData._id;

                    await User.findOneAndUpdate({_id: req.session.userId}, updateObj, {new: true});
                    console.log(`Slot booked:`);
        
                    req.flash("validationErrors", "Slot booked successfully");
                    res.redirect('/user/driverDetails');
                } else {
                    console.log(`Slot not available`);
                    req.flash("validationErrors", "Slot not available");
                    req.flash("data", req.body)
                    return res.redirect('/user/bookAppointment');
                }
            } else {
                console.log(`You already have a appointment booked`);

                req.flash("validationErrors", "You already have a appointment booked");
                res.redirect('/user/bookAppointment');
            }
        }
    }catch(err){
        console.log(__filename,err);
        req.flash("validationErrors", "Something went wrong, please try again later");
        res.redirect('/user/bookAppointment');
    }
}