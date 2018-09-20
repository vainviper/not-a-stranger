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
        User            = require('./models/user'),
        middleware      = require("./middleware/"),
        seed            = require('./seed');

const   strangerRoutes  = require('./routes/strangers'),
        authRoutes      = require('./routes/index');

mongoose.connect("mongodb://localhost/stranger_db", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static(__dirname + "/public"));
app.use(flash());
// seed();

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

app.use(strangerRoutes);
app.use(authRoutes);

app.listen(3000, () => {
    console.log('Server for Not A Stranger has started');
});