const bcrypt = require('bcrypt');
const Admin = require('../models/admin');

exports.getRegistrationForm = (req, res) => {
    res.render('admin/register');
};

exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new admin record
        await Admin.create({ email, password: hashedPassword });
        // Redirect to login page or dashboard
        res.render('admin/login');
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { error: 'Internal Server Error' });
    }
};
