const express = require('express');
const router = express.Router();
const cors = require('cors'); // Import cors package

router.use(cors());


router.get('/', async (req, res) => {
    try {
        // Fetch data from the database or backend API
        const title = 'About Page';
        const banner = 'About Banner';

        // Send the fetched data as a JSON response
        res.json({ title, banner });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
