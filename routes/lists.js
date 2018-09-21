const   express     = require('express'),
        router      = express.Router(),
        middleware  = require('../middleware/'),
        List        = require('../models/dblist'),
        Stranger    = require('../models/individual');

// INDEX
router.get('/lists', middleware.isLoggedIn, (req, res) => {
    List.
        find({
            'author.id': req.user.id
        }).
        exec((err, foundList) => {
            if(err) {
                req.flash('error', 'LISTS INDEX Item could not be found');
                res.redirect('back');
            } else {
                res.render('lists/lists', {list:foundList});
            }
        });
});

//NEW
router.get('/lists/new', middleware.isLoggedIn, (req, res) => {
    res.render('lists/new');
});

//CREATE
router.post('/lists',middleware.isLoggedIn, (req, res) => {
    let name = req.body.name,
    description = req.body.description,
    currentAge = req.body.currentAge,
    author = {
        id: req.user.id,
        username: req.user.username
    }
    newList = {name: name, description: description, currentAge: currentAge, author: author};
    List.create(newList, (err, list) => {
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            req.flash('success', 'List Created');
            res.redirect("/lists");
        }
    });
});

//SHOW
router.get("/lists/:id", middleware.isLoggedIn, (req, res) => {
    List.findById(req.params.id, function(err, foundList){
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            Stranger.
                find({
                    'list.id': req.params.id
                }).
                exec((err, foundStranger) => {
                    if(err) {
                        req.flash('error', ' LISTS SHOW Item could not be found');
                        res.redirect('back');
                    } else {
                        res.render('strangers/strangers', {list:foundList,stranger:foundStranger});
                    }
                });
        }
    });
});

//EDIT
router.get("/lists/:id/edit", middleware.checkListItemOwnership, (req, res) => {
    List.findById(req.params.id, (err,foundList) => {
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            res.render("lists/edit", {list: foundList});
        }
    });
});

//UPDATE
router.put("/lists/:id", middleware.checkListItemOwnership, (req,res) => {
    List.findByIdAndUpdate(req.params.id, req.body.list, function(err, updatedList) {
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('/lists');
        } else {
            console.log(updatedList);
            req.flash('success', 'List Updated');
            res.redirect("/lists");
        }
    });
});

router.delete('/lists/:id', middleware.checkListItemOwnership, (req, res) => {
    List.findByIdAndDelete(req.params.id, (err, deletedList) => {
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            req.flash('success', 'List Deleted');
            res.redirect("/lists");
        }
    });
});

module.exports = router;