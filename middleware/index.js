const Stranger = require('../models/individual');

module.exports = {

    isLoggedIn: function (req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        } else {
            req.flash('error', 'You need to be logged in to do that')
            res.redirect('back');
        }
    },
    currentUser: function (req, res, next) {
        res.locals.currentUser = req.user;
        res.locals.error = req.flash('error');
        res.locals.success = req.flash('success');
        next();
    },
    checkDbItemOwnership: function (req, res, next) {
        if(req.isAuthenticated()) {
            Stranger.findById(req.params.id, (err, foundStranger) => {
                if(err || !foundStranger) {
                    req.flash('error', 'Item could not be found');
                    res.redirect('back');
                } else {
                    if(foundStranger.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash("error", "You don't own that item");
                        res.redirect('back');
                    }
                }
            });
        } else {
            req.flash('error', 'You need to be logged in to do that')
            res.redirect('back');
        }
    }

};