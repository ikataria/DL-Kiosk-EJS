const User = require('../model/User');

module.exports = async (req, res, next) => {
    const admin = await User.findById(req.session.adminId);
    if(!admin) return res.redirect('/auth/login');

    next();
}