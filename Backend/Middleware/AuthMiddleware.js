const jwt = require('jsonwebtoken');
const Account = require("../Models/Account");

module.exports.verifyToken = async (req, res, next) => {
    console.log("kan");
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if(!token) {
        console.log("po");
        return res.status(401).json({ message: 'Token not found' });
    }

    try {
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded);

        const accountId = decoded.id;
        console.log(accountId);

        req.account = await Account.findOne({_id: accountId});
            if(!req.account) {
                console.log("oh1");
                return res.status(400).send('Account no found');
            }
            console.log("before next");
        next();
    } catch(e) {
        console.log(e.message);
        if (e.message === 'jwt expired') {
            return res.status(401).json({ message: 'Token has expired. Please login again' });
        }
        return res.status(400).json({ message: 'Invalid token' });
    }
}