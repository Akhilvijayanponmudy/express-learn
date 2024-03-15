const Contact = require('../models/contact');

// Controller function to list all items
const listItems = async (req, res) => {
    try {
        // Fetch all items from the database
        const items = await Contact.findAll();

        // console.log(items);
        items.sort((a, b) => b.id - a.id);

        // Render a view to display the items
        res.render('listing', { items });
    } catch (error) {
        console.error('Error fetching items from the database:', error);
        res.status(500).send('Internal Server Error');
    }
};




// Function to handle form submission and insert data into the database
const submitForm = async (req, res) => {
    // Extract form data from request body
    const { name, email, message } = req.body;

    
    try {
        // Insert data into the database
        const newContact = await Contact.create({
            name,
            email,
            message
        });

        // Log the inserted data
        console.log('Form data inserted:', newContact.toJSON());

        // Send response to the client
        // res.send('Form sub/mitted successfully!');
        res.redirect('listing')
    } catch (error) {
        // Handle errors
        console.error('Error inserting into database:', error);
        res.status(500).send('Error submitting form');
    }


};

module.exports = {
    submitForm,
    listItems
};
