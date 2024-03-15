// -------------------------------------------------------------
// Middleware to protect routes requiring authentication
function authenticateToken(req, res, next) {
    console.log('Inside Login Controller');
    // Extract token from authorization header
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    console.log('token is : '+token);

    // If no token, return 401 Unauthorized
    if (!token) return res.sendStatus(401);

    // Verify token
    jwt.verify(token, 'secret', (err, user) => {
        if (err) return res.sendStatus(403); // If token is invalid, return 403 Forbidden
        req.user = user; // Set user in request object
        next(); // Call next middleware
    });
}
module.exports = {
    authenticateToken
};
// -------------------------------------------------------------