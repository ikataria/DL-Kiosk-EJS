const User = require('../../model/User');

module.exports = (req, res) => {
    try{
        console.log(`body data: `, req.body);
    }catch(err){
        console.log(__filename, err);
    }
}