const express = require('express');
const router = express.Router();
const Dashboard = require('../controllers/dashboardController')
const adminVerifyToken = require('../controllers/adminVerifyToken');


router.get('/', adminVerifyToken, Dashboard);

// router.post('/', adminVerifyToken, Dashboard);

// Define route for /dashboard
// router.get('/', adminVerifyToken, (req, res) => {
//     res.render('admin/dashboard');



// if (req.session.adminId) {
//     // Render the dashboard view
//     res.render('admin/dashboard');
// } else {
//     // If user is not authenticated, redirect to login page
//     res.redirect('/login');
// }
// });
// 
module.exports = router; // Export the router instance