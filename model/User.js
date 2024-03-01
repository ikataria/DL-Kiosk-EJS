const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email:String,
    password: String,
    userType: String,
    firstName: String,
    lastName: String,
    licenceNumber: String,
    dob: Date,
    carDetails:{
        make: String,
        model: String,
        year: Date,
        plateNumber: String
    },
    examClass: String,
    isPassed: {
        type: Boolean,
        default: false
    },
    comment: String,
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    },

})

module.exports = mongoose.model('User', UserSchema)