const User = require('../model/User');

module.exports = async (req, res, next) => {
    const user = await User.findById(req.session.userId);
    if(!user) return res.redirect('/auth/login');

    next();
}