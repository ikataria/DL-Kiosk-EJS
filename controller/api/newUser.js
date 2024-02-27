const User = require('../../model/User');

module.exports = async (req, res) => {
    try{
        console.log(req.body);
        if(req.body.password !== req.body.confirmPassword){
            throw new Error('Password mismatch');
        }else{
            console.log("Pwd match");
            const userNameExits = await User.findOne({userName: req.body.userName});
            if(userNameExits){
                res.redirect('/auth/login');
                console.log('User already registered, please login.');
                return
            }

            await User({
                userName: req.body.userName,
                password: req.body.password,
                userType: req.body.userType
            }).save()

            res.redirect('/auth/login');
        }
    }catch(err){
        console.log(err);
        res.redirect('/auth/register');
    }
    
}