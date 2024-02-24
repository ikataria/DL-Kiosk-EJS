const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email:String,
    firstName: String,
    lastName: String,
    password: String,
    userType: String,
    examClass: String,
    licenceNumber: String,
    isPassed: {
        type: Boolean,
        default: false
    },
    comment: String,
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    },
    carDetails:{
        make: String,
        model: String,
        year: Number,
        plateNumber: String
    },

})

module.exports = mongoose.model('User', UserSchema)