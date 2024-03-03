const User = require('../../model/User');

module.exports = async (examClass) => {
    if(!examClass){
        console.log(`null`);
        return new Error('Provide exam class')
    } else{
        const driversList = await User.find({$and: [{examClass: examClass, appointmentId: {$exists: true}}] }).populate("appointmentId");
        console.log(__filename,`fetch driverslist for exam: ${examClass}:>`, driversList);
        return driversList;
    }
}