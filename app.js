const   express         = require('express'),
        methodOverride  = require('method-override'),
        app             = express(),
        bodyParser      = require('body-parser'),
        mongoose        = require('mongoose'),
        Stranger        = require('./models/individual'),
        seed            = require('./seed');

mongoose.connect("mongodb://localhost/stranger_db", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use('/static', express.static('public'));

// seed();

// LANDING PAGE
app.get("/", (req, res) => {
    res.redirect("strangers");
});

// INDEX
app.get("/strangers",(req, res) => {
    Stranger.find({}, (err,foundStranger) => {
        if(err) return handleError(err);
        res.render("strangers", {stranger:foundStranger});
    });
});

// NEW
app.get("/new",(req, res) => {
    res.render("new");
});

//CREATE
app.post("/strangers", (req, res) => {
    let firstName = req.body.firstName,
        lastName = req.body.lastName,
        meetArea = req.body.meetArea,
        occupation = req.body.occupation,
        age = req.body.age,
        bio = req.body.bio,
        newindividual = {firstName: firstName, lastName: lastName, meetArea: meetArea, occupation: occupation, age: age, bio: bio};
        Stranger.create(newindividual, (err, individual) => {
        if(err) return handleError(err);
        res.redirect("/strangers");
    });
});

//SHOW
app.get("/strangers/:id", (req, res) => {
    Stranger.findById(req.params.id, function(err, foundStranger){
        if(err) {
            console.log(err)
        } else {
            res.render("show", {stranger:foundStranger});
        }
    });
});

//EDIT
app.get("/strangers/:id/edit", (req, res) => {
    Stranger.findById(req.params.id, (err,foundStranger) => {
        if(err) return handleError(err);
        res.render("edit", {stranger: foundStranger});
    });
});

app.put("/strangers/:id", (req,res) => {
    Stranger.findByIdAndUpdate(req.params.id, req.body.stranger, function(err, updatedStranger) {
        if(err) return handleError(err);
        res.redirect("/strangers/" + req.params.id);
    });
});

app.delete("/strangers/:id", (req, res) => {
    Stranger.findByIdAndRemove(req.params.id, function (err, destroyedStranger) {
        if(err) return handleError(err);
        res.redirect("/strangers");
    });
});

app.listen(3000, () => {
    console.log('Server for Not A Stranger has started');
});