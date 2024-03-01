const User = require("../../model/User");
const Appointment = require("../../model/Appointment");

exports.fetchDriverDetailsFn = async (userId) => {
    try{
        // console.log(__filename, `userId:`, userId);
        // const driverDetailsObj = await User.findById(userId);
        const driverDetailsObj = await Appointment.findOne({userId}).populate("userId");
        // console.log(`driverAppointmentDetails:`, driverDetailsObj);

        if(driverDetailsObj && driverDetailsObj.userId.firstName){
            return driverDetailsObj
        }else{
            return null;
        }
    }catch(err){
        console.log(__filename, err);
        return err;
    }
}
