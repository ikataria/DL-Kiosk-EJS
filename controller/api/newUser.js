const User = require('../../model/User');

module.exports = (req, res) => {
    try{
        console.log('this is register body:', JSON.stringify(req.body));
        console.log('this is register >', req.body);
        if(req.body.password !== req.body.confirmPassword){
            throw new Error('Password mismatch');
        }else{
            console.log("Pwd match");
        }
    }catch(err){
        console.log('error::>.>>>>',err);
        // const validationErrors = 

    }finally{
        res.redirect('/auth/register');
    }
    
}