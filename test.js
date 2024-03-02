// Fields for user
// email // - use for nodemailer
// userName // unique ID
// firstName
// lastName
// password
// userType
// examClass
// licenceNumber
// car:{
//     make
//     model
//     year
//     plateNumber
// }

// Fields for Appointment Model
// time
// date
// isTimeSlotAvailable


function get() {
    try {
      console.log("Inside try");
      throw new Error("Return error");
    } catch(e){
      console.log(e);
    //   return 20
    } finally{
      console.log("Inside finally");
    //   return 30;
    }
    
    console.log("Outside try...catch...finally");
    return 40;
  }
  
  console.log("The value is ", get());




