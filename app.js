
// app.js

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
// const port = 3000;
const port = process.env.PORT || 5000;
const multer = require('multer');
const path = require('path');
const Image = require('./models/image');

const sequelize = require('./config/db'); // Assuming your Sequelize instance is exported from config/config.js



sequelize.sync()
    .then(() => {
        // console.log('Database synchronized');
        // Start your Express server here
    })
    .catch(error => {
        console.error('Error synchronizing database:', error);
    });



const upload = multer({
    dest: 'uploads/', // Configure a temporary directory for temporary file storage
    fileFilter: (req, file, cb) => {
        const allowedExtensions = ['.jpg', '.jpeg', '.png']; // Allowed image extensions
        const ext = path.extname(file.originalname);
        if (allowedExtensions.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    },
});






// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views'); // Optional: specify the directory where your views are located

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware
app.use(bodyParser.json());

// Initialize Express session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Import your routes
const indexRouter = require('./routes/index');
const contactRouter = require('./routes/contact');
const listingRouter = require('./routes/listing');
const itemRouter = require('./routes/item');
const aboutRouter = require('./routes/about');
const loginRouter = require('./routes/adminRoutes');
const registerRouter = require('./routes/adminRegister');
const dashboardRouter = require('./routes/adminDashboard');
const displayRouter = require('./routes/display');
const regsitrationRouter = require('./routes/regsitration');
const userLogin = require('./routes/userLogin');

// Use your routes
app.use('/', indexRouter);
app.use('/contact', contactRouter);
app.use('/listing', listingRouter);
app.use('/items', itemRouter);
app.use('/about', aboutRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/dashboard', dashboardRouter)
app.use('/display', displayRouter)
app.use('/regsitration', regsitrationRouter)
app.use('/userlogin', userLogin)

// ***************************************************************
app.get('/api/users', (req, res) => {
    res.json({ message: 'GET request to /api/users' });
});


// const { Contact } = require('./models/contact');

const Contact = require('./models/contact')
// Define route to fetch all items
app.get('/api/contacts', async (req, res) => {
    try {
        // Fetch all items from the Contact database
        const contacts = await Contact.findAll();
        // Send items as JSON response
        res.json(contacts);
    } catch (error) {
        // console.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// ++++++++++++  Image Upload   ++++++++


app.get('/upload', (req, res) => {
    res.render('upload')
})

app.post('/upload', upload.single('uimage'), async (req, res) => {
    try {
        const { filename } = req.file;
        const { fullname } = req.body;
        // console.log(filename);

        const imageSet = await Image.create({
            fullname,
            filename
        })
        // console.log('Form data inserted:', imageSet.toJSON());

        res.json({ message: 'Image uploaded successfully!', filename });
    } catch (error) {
        // console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



app.post('/upload', upload.single('image'), (req, res) => {


    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    // console.log(req.file.filename); // This should print the filename if Multer parsed the file correctly
    res.send('File uploaded successfully.');



    // app.post('/upload', (req, res) => {
    const { fullname } = req.body;
    const imageFileName = req.file.filename;
    // console.log(fullname);
    // console.log(imageFileName);

    res.send('successs')
})


// ++++++++++++  Image Upload   ++++++++






// const apiRoutes = require('./routes/api/apiRoutes');
// app.use('/api', apiRoutes); 

app.post('/api/data', async (req, res) => {
    try {
        const { name, email, message } = req.body; // Replace with your actual properties
        const apiData = await Contact.create({
            name, email, message
        });
        // Send a success response
        res.json({ message: 'Form data inserted:' });
        // res.json({ message: 'Data received successfully' });
    } catch (error) {
        // console.error('Error processing data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/data-by-id', async (req, res) => {
    const { id } = req.body;

    try {
        const item = await Contact.findByPk(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });

        }
        return res.json(item);

    } catch (error) {
        // console.error('Error updating item:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

    res.json({ message: 'Form data inserted:' });
});



// ***************************************************************












// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});




