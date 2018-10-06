const   express     = require('express'),
        router      = express.Router(),
        middleware  = require('../middleware/'),
        Group    = require('../models/group'),
        List        = require('../models/dblist');


// INDEX
router.get("/lists/:id/groups", middleware.isLoggedIn, (req, res) => {
    List.findById(req.params.id, function(err, foundList){
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            Group.
                find({
                    'list.id': req.params.id
                }).
                exec((err, foundGroup) => {
                    if(err) {
                        req.flash('error', 'GROUP SHOW Item could not be found');
                        res.redirect('back');
                    } else {
                        res.render('groups/groups', {list:foundList,group:foundGroup});
                    }
                });
        }
    });
});

// NEW
router.get("/lists/:id/groups/new", middleware.isLoggedIn, (req, res) => {
    List.findById(req.params.id, (err, foundList) => {
        if(err) {
            req.flash('error', 'List not found');
            res.redirect('back');
        } else {
            res.render('groups/new', {list: foundList, group: null});
        }
    });
});

// CREATE
router.post("/lists/:id/groups", middleware.isLoggedIn, (req, res) => {
    let name = req.body.name,
        desc = req.body.desc,
        author = {
            id: req.user.id,
            username: req.user.username
        },
        list = {
            id: req.params.id
        },
        newgroup = {name: name, desc: desc, author: author, list: list};
        Group.create(newgroup, (err, group) => {
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            req.flash('success', 'Group Created');
            res.redirect("/lists/" + req.params.id + "/groups"); 
        }
    });
});

//SHOW
router.get("/lists/:id/groups/:group_id", middleware.isLoggedIn, (req, res) => {
    List.findById(req.params.id, (err, foundList) => {
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            Group.findById(req.params.group_id, function(err, foundGroup){
                if(err) {
                    req.flash('error', 'Something went wrong');
                    res.redirect('back');
                } else {
                    res.render("groups/show", {list: foundList, group:foundGroup});
                }
            });            
        }
    });
});

//EDIT
router.get("/lists/:id/groups/:group_id/edit", middleware.checkDbGroupOwnership, (req, res) => {
    List.findById(req.params.id, (err, foundList) => {
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');           
        } else {
            Group.findById(req.params.group_id, (err, foundGroup) => {
                if(err) {
                    req.flash('error', 'Something went wrong');
                    res.redirect('back');
                } else {
                    res.render("groups/edit", {list: foundList, group: foundGroup});
                }
            });   
        }
    })
});

router.put("/lists/:id/groups/:group_id", middleware.checkDbGroupOwnership, (req,res) => {
    Group.findByIdAndUpdate(req.params.group_id, req.body.group, function(err, updatedGroup) {
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('lists/' + req.params.id);
        } else {
            req.flash('success', 'Group Updated');
            res.redirect("/lists/" + req.params.id + "/groups/" + req.params.group_id);
        }
    });
});

router.delete("/lists/:id/groups/:group_id", middleware.checkDbGroupOwnership, (req, res) => {
    Group.findByIdAndDelete(req.params.group_id, function (err, destroyedGroup) {
        if(err) {
            req.flash('error', 'Something went wrong');
            res.redirect('back');
        } else {
            req.flash('success', 'Group Deleted');
            res.redirect("/lists/" + req.params.id + "/groups");
        }
    });
});

module.exports = router;