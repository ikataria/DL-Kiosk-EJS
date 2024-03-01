const User = require('../../model/User');

module.exports = async (req, res) => {
    try{
        if(req.body.password.trim() !== req.body.confirmPassword.trim()){
            req.flash("validationErrors", 'Password mismatch');
            return res.redirect('/auth/register');
        }else{
            const userNameExists = await User.findOne({userName: req.body.userName.trim()});
            if(userNameExists){
                req.flash("validationErrors", 'User already registered, please login.');
                return res.redirect('/auth/login');
            }

            await User({
                userName: req.body.userName.trim(),
                password: req.body.password.trim(),
                userType: req.body.userType.trim()
            }).save()

            res.redirect('/auth/login');
        }
    }catch(err){
        console.log(__filename,err);
        req.flash("validationErrors", "Something went wrong, please try again later");
        res.redirect('/auth/register');
    }
    
}