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

//SHOW
router.get("/users/:id", middleware.isLoggedIn, middleware.isAdmin, (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if(err) {
            req.flash('error', 'ADMIN SHOW USER Something went wrong');
            res.redirect('back');
        } else {
            res.render('users/show', {user: foundUser});
        }
    });
});

//EDIT
router.get('/users/:id/edit', middleware.isLoggedIn, middleware.isAdmin, (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if(err) {
            req.flash('error', 'ADMIN EDIT USER Something went wrong');
            res.redirect('back');
        } else {
            res.render('users/edit', {user: foundUser});
        }
    });
});

// UPDATE
router.put('/users/:id', middleware.isLoggedIn, middleware.isAdmin, (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body.user, (err, updatedUser) => {
        if(err) {
            req.flash('error', 'ADMIN UPDATE USER Somethong went wrong');
            res.redirect('back');
        } else {
            req.flash('success', 'User Updated');
            res.redirect('/users');
        }
    });
});

// DELETE
router.delete('/users/:id', middleware.isLoggedIn, middleware.isAdmin, (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, removedUser) => {
        if(err) {
            req.flash('error', 'ADMIN USER DELETE Something went wrong');
            res.redirect('back');
        } else {
            req.flash('success', 'User Removed');
            res.redirect('/users');
        }
    });
});

module.exports = router;