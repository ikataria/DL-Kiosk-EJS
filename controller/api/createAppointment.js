const Appointment = require("../../model/Appointment");

module.exports = async (req, res) => {
  try {
    if (!req.body.appointmentDate || !req.body.appointmentTime) {
      req.flash("validationErrors", "Please provide all details");
      return res.redirect("/admin/createAppointment");
    } else {
      const appointmentDate = req.body.appointmentDate.trim();
      const appointmentTime = req.body.appointmentTime.trim();

      const isSlotBooked = await Appointment.findOne({
        $and: [
          { appointmentTime },
          { appointmentDate },
        ],
      });

      if(!isSlotBooked){
          const appointmentCreated = await new Appointment({
            appointmentDate,
            appointmentTime,
          }).save();

          req.flash("successMsg","Slot created successfully");
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
