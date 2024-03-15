
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const cookiesArray = req.headers.cookie.split('; ');
    const jwtSecret = process.env.JWT_SECRET;
    // Check if there are any cookies
    if (!cookiesArray) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    let tokenValue;
    for (const cookie of cookiesArray) {
        const [cookieName, cookieValue] = cookie.split('=');
        // Check if the cookie name is 'token'
        if (cookieName === 'token') {
            // Store the cookie value
            tokenValue = cookieValue;
            try {
                // Decode the token (without verification) to inspect its payload
                // const decodedPayload = jwt.decode(tokenValue);
                // Verify the token using the JWT_SECRET
                const decoded = jwt.verify(tokenValue, jwtSecret);
                req.userId = decoded.userId;
                next(); // Allow access if token is valid
                return; // Exit the loop since we found the token
            } catch (error) {
                console.error('Error verifying token:', error);
                return res.status(401).json({ message: 'Unauthorized' });
            }
        }
    }
    // If no 'token' cookie is found
    return res.render('userlogin')
    // return res.status(401).json({ message: 'Unauthorized' });
};

module.exports = verifyToken;
