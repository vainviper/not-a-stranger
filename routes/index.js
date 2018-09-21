const   express     = require('express'),
        router      = express.Router(),
        passport    = require('passport'),
        User        = require('../models/user');

// LANDING PAGE
router.get("/", (req, res) => {
    res.render("index");
});

//AUTH ROUTES
router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    let newUser = new User({ username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            passport.authenticate("local")(req, res, () => {
                req.flash('success', 'User ' + req.body.username + ' has been created');
                res.redirect("/lists");
            });
        }
    });
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/lists",
        failureRedirect: "/login",
        failureFlash: true
    }));

router.get("/logout", (req, res) => {
    req.logout();
    req.flash('success', 'Successfully logged out');
    res.redirect("/");
});

module.exports = router;