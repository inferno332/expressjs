var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    const data = [
        {
            id: 1,
            name: 'CPU',
            description: 'Cac loai CPU cho may tinh',
        },
        {
            id: 2,
            name: 'HDD',
            description: 'Cac loai dia cung cho may tinh',
        },
    ];
    res.json(data);
});
// GET WITH PARAMS
router.get('/categories/:id', (req, res) => {});

module.exports = router;
