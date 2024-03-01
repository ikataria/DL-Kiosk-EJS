const Appointment = require("../../model/Appointment");

module.exports = async (req, res) => {
  try {
    if (!req.body.appointmentDate || !req.body.appointmentTime) {
      console.log(`body:`, req.body);

      req.flash("validationErrors", "Please provide all details");
      return res.redirect("/admin/createAppointment");
    } else {
      console.log(`body:`, req.body);
      const appointmentDate = req.body.appointmentDate.trim();
      const appointmentTime = req.body.appointmentTime.trim();

      const isSlotBooked = await Appointment.findOne({
        $and: [
          { appointmentTime },
          { appointmentDate },
        ],
      });

      console.log(`isSlotAvailable:`, isSlotBooked);
      if(!isSlotBooked){
          const appointmentCreated = await new Appointment({
            appointmentDate,
            appointmentTime,
          }).save();

          req.flash("validationErrors","Slot created successfully");
          return res.redirect('/admin/createAppointment');
      }else{
            req.flash("validationErrors","Slot already created, choose different time slot");
            return res.redirect('/admin/createAppointment');
      }
    }
  } catch (err) {
    console.log(__filename, err);
    req.flash("validationErrors", "Something went wrong, please try again later");
    return res.redirect("/admin/createAppointment");
  }
};
