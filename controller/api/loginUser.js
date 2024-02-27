const User = require('../../model/User');

module.exports = async (req, res) => {
    try{
        if(!req.body.password || !req.body.userName){
            console.log('Please provide email and password');
        }else{
            console.log("Pwd match");
            const userData = await User.findOne({userName: req.body.userName});
            if(!userData){
                res.redirect('/auth/register');
                console.log('User not registered, please sign up first.');
            }else{
                if(userData.userType === 'admin'){
                    res.redirect('/admin/home');
                }else if(userData.userType === 'examiner'){
                    res.redirect('/examiner/home');
                }else{
                    req.session.userId = userData._id
                    res.redirect('/user/bookAppointment');
                }
            }

        }
    }catch(err){
        console.log(err);
        res.redirect('/auth/register');
    }
    
}