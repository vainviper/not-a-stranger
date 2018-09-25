const   express     = require('express'),
        router      = express.Router(),
        passport    = require('passport'),
        middleware  = require('../middleware/'),
        User        = require('../models/user'),
        Stranger    = require('../models/individual'),
        List        = require('../models/dblist');

//USER SHOW
    router.get('/user/:id', middleware.checkUserOwnership, (req, res) => {
        User.findById(req.params.id, (err, foundUser) => {
          if(err) {
            req.flash('error', 'USER SHOW Something went wrong');
            res.redirect('back');
            } else {
                res.render('users/show', {user: foundUser});
            }  
        });   
    });

//USER EDIT
router.get('/user/:id/edit', middleware.checkUserOwnership, (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if(err) {
            req.flash('error', 'ADMIN EDIT USER Something went wrong');
            res.redirect('back');
        } else {
            res.render('users/edit', {user: foundUser});
        }
    });
});

// USER UPDATE
router.put('/user/:id', middleware.checkUserOwnership, (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body.user, (err, updatedUser) => {
        if(err) {
            req.flash('error', 'ADMIN UPDATE USER Somethong went wrong');
            res.redirect('back');
        } else {
            req.flash('success', 'User Updated, please log in again');
            res.redirect('/');
        }
    });
});

// USER DELETE
router.delete('/user/:id', middleware.checkUserOwnership, (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, removedUser) => {
        if(err) {
            req.flash('error', 'ADMIN USER DELETE Something went wrong');
            res.redirect('back');
        } else {
            req.flash('success', 'User Removed');
            res.redirect('/');
        }
    });
});

module.exports = router;