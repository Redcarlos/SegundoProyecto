const express = require('express');
const router = express.Router();
//'Router' un metodo para devolver un objeto para ingresar rutas 

router.get('/', (req, res) => {
    res.json({
        status: 'API Works!'
    });
});

module.exports = router;