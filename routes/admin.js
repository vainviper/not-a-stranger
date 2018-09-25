const   express     = require('express'),
        router      = express.Router(),
        passport    = require('passport'),
        middleware  = require('../middleware/'),
        User        = require('../models/user'),
        Stranger    = require('../models/individual'),
        List        = require('../models/dblist');

//ADMIN INDEX
router.get('/lists/all',middleware.isLoggedIn, middleware.isAdmin, (req, res) => {
    List.find({}, (err, foundList) => {
        if(err) {
            req.flash('error', 'ADMIN INDEX LIST Item could not be found');
            res.redirect('back');
        } else {
            res.render('lists/lists', {list:foundList});
        }
    });
});

// SHOW
router.get('/users', middleware.isLoggedIn, middleware.isAdmin, (req, res) => {
    User.find({}, (err, foundUser) => {
        if(err) {
            req.flash('error', 'ADMIN INDEX USER Item could not be found');
            res.redirect('back');
        } else {
            res.render('users/user', {user: foundUser});
        }
    });
});

module.exports = router;