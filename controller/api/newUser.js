const User = require('../../model/User');

module.exports = async (req, res) => {
    try{
        if(req.body.password !== req.body.confirmPassword){
            throw new Error('Password mismatch');
        }else{
            console.log("Pwd match");
            await User({
                userName: req.body.userName,
                password: req.body.password
            }).save()

            res.redirect('/auth/login');
        }
    }catch(err){
        console.log(err);
        res.redirect('/auth/register');
    }
    
}