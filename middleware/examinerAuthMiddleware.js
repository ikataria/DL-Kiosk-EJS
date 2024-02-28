const User = require('../model/User');

module.exports = async (req, res, next) => {
    const examiner = await User.findById(req.session.examinerId);
    if(!examiner) return res.redirect('/auth/login');

    next();
}