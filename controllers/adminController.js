// controllers/adminController.js

const bcrypt = require('bcrypt');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');


exports.getLoginForm = (req, res) => {
    res.render('admin/login', { error: null }); // Pass error as null initially

};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
            return res.status(401).render('admin/login', { error: 'Invalid email ' });
        }
        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return res.status(401).render('admin/login', { error: 'Invalid   password' });
        }

        const token = jwt.sign({ adminId: admin.id }, 'adminsecretkey');
        res.cookie('admintoken', token, { httpOnly: true });
        req.session.adminId = admin.id;
        res.redirect('/dashboard');


    } catch (error) {
        console.error(error);
        res.status(500).render('error', { error: 'Internal Server Error' });
    }
};
