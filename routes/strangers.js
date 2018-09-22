const   express     = require('express'),
        router      = express.Router(),
        middleware  = require('../middleware/'),
        Stranger    = require('../models/individual'),
        List        = require('../models/dblist');

// NEW
router.get("/lists/:id/strangers/new", middleware.isLoggedIn, (req, res) => {
    List.findById(req.params.id, (err, foundList) => {
        if(err) {
            req.flash('error', 'List not found');
            res.redirect('back');
        } else {
            res.render('strangers/new', {list: foundList, stranger: null});
        }
    });
});

// CREATE
router.post("/lists/:id/strangers", middleware.isLoggedIn, (req, res) => {
    let firstName = req.body.firstName,
        lastName = req.body.lastName,
        race = req.body.race,
        nation = req.body.nation,
        meetArea = req.body.meetArea,
        occupation = req.body.occupation,
        born = (req.body.currentAge - req.body.age),
        bio = req.body.bio,
        author = {
            id: req.user.id,
            username: req.user.username
        },
        list = {
            id: req.params.id
        },
        newindividual = {firstName: firstName, lastName: lastName, race: race, nation: nation, meetArea: meetArea, occupation: occupation, born: born, bio: bio, author: author, list: list};
        console.log(newindividual);
        Stranger.create(newindividual, (err, individual) => {
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            req.flash('success', 'Stranger Created');
            res.redirect("/lists/" + req.params.id); 
        }
    });
});

//SHOW
router.get("/lists/:id/strangers/:stranger_id", middleware.isLoggedIn, (req, res) => {
    List.findById(req.params.id, (err, foundList) => {
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            Stranger.findById(req.params.stranger_id, function(err, foundStranger){
                if(err) {
                    req.flash('error', 'Something went wrong');
                    res.redirect('back');
                } else {
                    res.render("strangers/show", {list: foundList, stranger:foundStranger});
                }
            });            
        }
    });
});

//EDIT
router.get("/lists/:id/strangers/:stranger_id/edit", middleware.checkDbItemOwnership, (req, res) => {
    List.findById(req.params.id, (err, foundList) => {
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');           
        } else {
            Stranger.findById(req.params.stranger_id, (err,foundStranger) => {
                if(err) {
                    req.flash('error', 'Something went wrong');
                    res.redirect('back');
                } else {
                    res.render("strangers/edit", {list: foundList, stranger: foundStranger});
                }
            });   
        }
    })
});

router.put("/lists/:id/strangers/:stranger_id", middleware.checkDbItemOwnership, (req,res) => {
    let born = (req.body.stranger.currentAge - req.body.stranger.age);
    req.body.stranger.born = born;
    Stranger.findByIdAndUpdate(req.params.stranger_id, req.body.stranger, function(err, updatedStranger) {
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('lists/' + req.params.id);
        } else {
            req.flash('success', 'Stranger Updated');
            res.redirect("/lists/" + req.params.id + "/strangers/" + req.params.stranger_id);
        }
    });
});

router.delete("/lists/:id/strangers/:stranger_id", middleware.checkDbItemOwnership, (req, res) => {
    Stranger.findByIdAndDelete(req.params.stranger_id, function (err, destroyedStranger) {
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            req.flash('success', 'Stranger Deleted');
            res.redirect("/lists/" + req.params.id);
        }
    });
});

module.exports = router;