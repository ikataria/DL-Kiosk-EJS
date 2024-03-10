const User = require("../../model/User");
const Appointment = require("../../model/Appointment");

exports.fetchDriverDetailsFn = async (userId) => {
    try{
        const driverDetailsObj = await Appointment.findOne({userId}).populate("userId");

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
