const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto');
        const data = response.data.sprites;
        const dataTwo = data.other.showdown;
        console.log(dataTwo);
        // console.dir(data, { depth: null });

        res.render('display', { sprite: data,gifdata:dataTwo })
    } catch (error) {
        console.error(error);

        res.status(500).send('Error fetching data from PokeAPI');

    }
})

module.exports = router;