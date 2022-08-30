var express = require('express');
var router = express.Router();
var { validateSchema, loginSchema } = require('./schemas.yup');
var passport = require('passport');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/', validateSchema(loginSchema), function (req, res, next) {
    const { username, password } = req.body;
    // console.log(req.body);
    if (username === 'bhuynhcongkhoa@gmail.com' && password === '123456789') {
        // jwt config
        var payload = {
            user: {
                username: username,
                email: 'tungnt@softech.vn',
            },
            application: 'social media',
        };
        var secret = 'ADB57C459465E3ED43C6C6231E3C2';
        var token = jwt.sign(payload, secret, {
            expiresIn: 20,
            audience: 'softech.cloud',
            issuer: 'softech.cloud',
            subject: username,
            algorithm: 'HS512',
        });

        // Response
        res.status(200).json({
            login: true,
            user: {
                username: username,
                fullName: 'Huynh Cong Khoa',
            },
            token: token,
        });
        return;
    }
    res.status(401).json({
        statusCode: 401,
        message: 'Unauthorized',
    });

    res.send('login');
});

// Setup jwt middleware
router.get(
    '/',
    passport.authenticate('jwt', {
        session: false,
    }),
    (req, res, next) => {
        res.json({ verify: true });
    },
);

module.exports = router;
