const User = require('../../model/User');

module.exports = async (req, res) => {
    try{
        if(!req.body.password || !req.body.userName){
            req.flash('validationErrors', 'Please provide Username and Password');
            return res.redirect('/auth/login');
        }else{
            const userData = await User.findOne({userName: req.body.userName.trim()});
            if(!userData){
                req.flash("validationErrors", 'User not registered, please sign up first')
                return res.redirect('/auth/register');
            }else{
                if(userData.password === req.body.password.trim()){
                    console.log(`pwd correct, welcome`);
                    if(userData.userType === 'admin'){
                        req.session.adminId = userData._id
                        res.redirect('/admin/home');
                    }else if(userData.userType === 'examiner'){
                        req.session.examinerId = userData._id
                        res.redirect('/examiner/home');
                    }else{
                        req.session.userId = userData._id
                        res.redirect('/user/bookAppointment');
                    }
                } else {
                    req.flash("validationErrors", 'Password incorrect, try again')
                    return res.redirect('/auth/login');
                }
            }
        }
    }catch(err){
        console.log(__filename,err);
        req.flash("validationErrors", "Something went wrong, please try again later")
        res.redirect('/auth/register');
    }
    
}