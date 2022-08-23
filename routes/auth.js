var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
    const { username, password } = req.body;
    console.log(req.body);
    if (username === 'tungnt@softech.vn' && password === '123456789') {
        res.json({
            user: {
                id: 1,
                email: 'tungnt@softech.vn',
                username: 'tungnt',
                firstName: 'Tony',
                lastName: 'Woo',
                isActive: true,
            },
            access_token: '...',
        });
        return;
    }
    res.status(401).json({
        statusCode: 401,
        message: 'Error',
    });

    res.send('login');
});

module.exports = router;
