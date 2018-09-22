const   express         = require('express'),
        app             = express(),
        mongoose        = require('mongoose'),
        methodOverride  = require('method-override'),
        flash           = require('connect-flash'),
        session         = require(`express-session`),
        bodyParser      = require('body-parser'),
        passport        = require('passport'),
        PassportLocal   = require('passport-local').Strategy,
        Stranger        = require('./models/individual'),
        List            = require('./models/dblist'),
        User            = require('./models/user'),
        middleware      = require("./middleware/"),
        seed            = require('./seed');

const   listRoutes      = require('./routes/lists'),
        strangerRoutes  = require('./routes/strangers'),
        authRoutes      = require('./routes/index');

const url = process.env.STRANGERDBURL || "mongodb://localhost/stranger_db";
mongoose.connect(url, {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static(__dirname + "/public"));
app.use(flash());
// seed.deleteList();
// seed.deleteStranger();
// seed.deleteUser();

//PASSPORT CONFIGURATION
app.use(session({
    secret: 'The apples is falling',
    resave: false, 
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new PassportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(middleware.currentUser);

app.use(listRoutes);
app.use(strangerRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Server for Not A Stranger has started');
});

// app.listen(3000, () => {
//     console.log('Server for Not A Stranger has started');
// });