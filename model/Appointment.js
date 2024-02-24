const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    appointmentTime: String,
    appointmentDate: Date,
    isTimeSlotAvailable: {
        type: Boolean,
        default: true
    }
})

module.exports = monogoose.model('Appointment', AppointmentSchema)