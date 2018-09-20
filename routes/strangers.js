const   express     = require('express'),
        router      = express.Router(),
        middleware  = require('../middleware/'),
        Stranger    = require('../models/individual');

// INDEX
let sortBy = {firstName: 1};
router.get('/strangers', middleware.isLoggedIn, (req, res) => {
    Stranger.
        find({
            'author.id': req.user.id
        }).
        sort(sortBy).
        exec((err, foundStranger) => {
            if(err){
                req.flash('error', 'Item could not be found');
                res.redirect('back');
            } else {
                res.render('strangers', {stranger:foundStranger});
            }
        });
});

// NEW
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("new");
});

//CREATE
router.post("/strangers", middleware.isLoggedIn, (req, res) => {
    let firstName = req.body.firstName,
        lastName = req.body.lastName,
        meetArea = req.body.meetArea,
        occupation = req.body.occupation,
        age = req.body.age,
        bio = req.body.bio,
        author = {
            id: req.user.id,
            username: req.user.username
        },
        newindividual = {firstName: firstName, lastName: lastName, meetArea: meetArea, occupation: occupation, age: age, bio: bio, author: author};
        Stranger.create(newindividual, (err, individual) => {
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            req.flash('success', 'Stranger Created');
            res.redirect("/strangers"); 
        }
    });
});

//SHOW
router.get("/strangers/:id", middleware.isLoggedIn, (req, res) => {
    Stranger.findById(req.params.id, function(err, foundStranger){
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            res.render("show", {stranger:foundStranger});
        }
    });
});

//EDIT
router.get("/strangers/:id/edit", middleware.checkDbItemOwnership, (req, res) => {
    Stranger.findById(req.params.id, (err,foundStranger) => {
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            res.render("edit", {stranger: foundStranger});
        }
    });
});

router.put("/strangers/:id", middleware.checkDbItemOwnership, (req,res) => {
    Stranger.findOneAndUpdate(req.params.id, req.body.stranger, function(err, updatedStranger) {
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');;
        } else {
            req.flash('success', 'Stranger Updated');
            res.redirect("/strangers/" + req.params.id);
        }
    });
});

router.delete("/strangers/:id", middleware.checkDbItemOwnership, (req, res) => {
    Stranger.findOneAndDelete(req.params.id, function (err, destroyedStranger) {
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            req.flash('success', 'Stranger Deleted');
            res.redirect("/strangers");
        }
    });
});

module.exports = router;