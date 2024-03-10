const User = require('./model/User');
const Appointment = require('./model/Appointment');



const get = new Promise(async (resolve, reject)=> {
    try {
      console.log(`b4 query`);
      const deleteduser = await User.collection.drop();
      const deletedAppointment = await Appointment.collection.drop({});
      console.log(`after query>>>`);
      resolve("user deleted", deleteduser);
      resolve("Appointment deleted", deletedAppointment);
    } catch(e){
      reject(e);
    }
  })
  
get
  .then(value => {
    console.log(value);
  })
  .catch(error => {
    console.log(error);
  })





