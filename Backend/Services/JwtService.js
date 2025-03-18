const jwt = require('jsonwebtoken');

module.exports.generateVerificationToken = (userEmail) => {
    const token = jwt.sign({ email: userEmail}, process.env.JWT_SECRET_KEY, {expiresIn: '24h' });

    return token;
};