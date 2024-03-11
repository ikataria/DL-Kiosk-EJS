const Appointment = require("../../model/Appointment");

module.exports = async (req, res) => {
  try{
    if(!req.body.selectedDate){
      req.flash("validationErrors", "Please select the date first");
      return res.redirect("/admin/createAppointment");
    } else {
      const query = {$and: [{appointmentDate: new Date(req.body.selectedDate)}, {isTimeSlotAvailable: true}]};

      console.log(`queryL `, JSON.stringify(query));
      const availableSlots = await Appointment.find(query);

      console.log(`availableSlots::>`, JSON.stringify(availableSlots));
    }
  }catch(err){
    console.log(__filename,`err`, err);
  }
}

// module.exports = async (req, res) => {
//   try {

//     console.log(`received data>>>>`, req.body)
//     if (!req.body.appointmentDate || !req.body.appointmentTime) {
//       req.flash("validationErrors", "Please provide all details");
//       return res.redirect("/admin/createAppointment");
//     } else {
//       const appointmentDate = req.body.appointmentDate.trim();
//       const appointmentTime = req.body.appointmentTime.trim();

//       const isSlotBooked = await Appointment.findOne({
//         $and: [
//           { appointmentTime },
//           { appointmentDate },
//         ],
//       });

//       if(!isSlotBooked){
//           const appointmentCreated = await new Appointment({
//             appointmentDate,
//             appointmentTime,
//           }).save();

//           req.flash("successMsg","Slot created successfully");
//           return res.redirect('/admin/createAppointment');
//       }else{
//             req.flash("validationErrors","Slot already created, choose different time slot");
//             return res.redirect('/admin/createAppointment');
//       }
//     }
//   } catch (err) {
//     console.log(__filename, err);
//     req.flash("validationErrors", "Something went wrong, please try again later");
//     return res.redirect("/admin/createAppointment");
//   }
// };
