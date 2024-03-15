const jwt = require('jsonwebtoken');
require('dotenv').config();
const admiJwtSecret = process.env.ADMIN_JWT_SECRET;

const adminVerifyToken = (req, res, next) => {
    const cookiesArray = req.headers.cookie.split('; ');
    let admintokenValue = null;
    for (const element of cookiesArray) {
        if (element.startsWith('admintoken=')) {
            admintokenValue = element.substring('admintoken='.length);
            break;
        }
    }


    try {
        const decoded = jwt.verify(admintokenValue, admiJwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.render('admin/login', { error: error })

    }

}

module.exports = adminVerifyToken;