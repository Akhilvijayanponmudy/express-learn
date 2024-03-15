const express = require('express');
const cors = require('cors'); // Import cors package
const router = express.Router();

// Enable CORS for all routes
router.use(cors());

router.get('/', async (req, res) => {
    try {
        // Fetch data from the database or backend API
        const title = 'Home Page';
        const banner = 'Home Banner';

        // Send the fetched data as a JSON response
        res.json({ title, banner });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
