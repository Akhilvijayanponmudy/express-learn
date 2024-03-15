const Contact = require('../models/contact');

const getItemById = async (req, res) => {
    const itemId = req.params.id;
    try {
        const item = await Contact.findByPk(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        // res.json(item);
        res.render('item', { item });


    } catch (error) {
        console.error('Error fetching item from the database:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const updateItem = async (req, res) => {
    const itemId = req.params.id;
    const { name, email, message } = req.body;

    try {
        const item = await Contact.findByPk(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Update item properties
        item.name = name;
        item.email = email;
        item.message = message;

        // Save updated item to the database
        await item.save();

        // res.redirect(`/items/${itemId}`);
        res.redirect('/listing');

    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const deleteItem = async (req, res) => {
    const itemId = req.params.id;
    
    try {
        const item = await Contact.findByPk(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Delete the item from the database
        await item.destroy();

        // Redirect to the listing page
        res.redirect('/listing');
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getItemById,
    updateItem,
    deleteItem
};
