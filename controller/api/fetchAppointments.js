const Appointment = require('../../model/Appointment');

module.exports = async (date) => {
    try{
        const slots = await Appointment.find({appointmentDate: new Date(date)});
        console.log("slots::>6>>>",slots);
    }catch(err){

    }
}