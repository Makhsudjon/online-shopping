let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let csrf = require('csurf')
let express = require('express');
let router = express.Router();

let csrfProtection = csrf({ cookie: true });
let passport = require('passport')
let Products = require('../models/product')

router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
    Products.find(function(err, docs) {
        if (!docs) {
            res.render('shop/index', { title: 'Express', emptyArr: 'Sorry, we have\'t any pruducts.' });
        }
        let productChunks = [];
        let chunkSize = 3;
        for (let i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', { title: 'Express', products: productChunks });
    }).lean();

});

router.get('/user/signup', function(req, res, next) {
    console.log("csruf: " + req.csrfToken());
    res.render('user/signup', { csrfToken: req.csrfToken() });
});

router.post('/user/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

router.get('/user/profile', function(req, res, next) {
    res.render('user/profile');
});

module.exports = router;