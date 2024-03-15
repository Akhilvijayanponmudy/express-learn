// controllers/indexController.js

exports.getHome = (req, res) => {
    res.render('index');
};

exports.getAbout = (req, res) => {
    res.render('about');
};
