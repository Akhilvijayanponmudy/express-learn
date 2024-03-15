// contactController.js

const Contact = require('../models/contact');

// Controller function to list all items
// const listItems = async (req, res) => {
//     try {
//         // Fetch all items from the database
//         const items = await Contact.findAll();

//         // console.log(items);

//         // Render a view to display the items
//         res.render('listing', { items });
//     } catch (error) {
//         console.error('Error fetching items from the database:', error);
//         res.status(500).send('Internal Server Error');
//     }
// };

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
        // res.send('Form submitted successfully!');
        res.redirect('listing')
    } catch (error) {
        // Handle errors
        console.error('Error inserting into database:', error);
        res.status(500).send('Error submitting form');
    }
};

// Function to handle requests for a new page
const getNewPage = async (req, res) => {
    try {
        // Any logic to fetch data or process requests for the new page can go here

        // Render the new page
        res.send('new-page');
    } catch (error) {
        console.error('Error processing request for new page:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getItemById = async (id) => {
    try {
        const item = await Contact.findByPk(id)
        return item;
    } catch {
        throw new Error('Error fetching item from the database');

    }
}



module.exports = {
    // listItems,
    submitForm,
    getNewPage,
    getItemById
};



// Methods to be executed on routes 
const method1 = (req, res) => {
    res.send("Hello, Welcome to our Page");
}

const method2 = (req, res) => {
    res.send("Hello, This was a post Request");
}

// Export of all methods as object 
module.exports = {
    method1,
    method2
}
