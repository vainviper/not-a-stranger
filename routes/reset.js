const   express     = require('express'),
        router      = express.Router(),
        passport    = require('passport'),
        User        = require('../models/user'),
        async       = require('async'),
        nodemailer  = require('nodemailer'),
        crypto      = require('crypto');

router.get('/forgot', (req, res) => {
    res.render('forgot');
});

router.post('/forgot', (req, res, next) => {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, (err, buf) => {
                let token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            let email;
            if(req.user) {
                if(req.user.email === req.body.email) {
                   email = req.user.email; 
                } else {
                    req.flash('error', 'Nono user with that email adress exists.');
                    return res.redirect('/forgot');
                }  
            } else {
                email = req.body.email;
            }
            User.findOne({ email: email },(err, user) => {
                if(!user) {
                    req.flash('error', 'No user with that email adress exists.');
                    return res.redirect('/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000;

                user.save((err) => {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            let smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'notstrangerdev@gmail.com',
                    pass: process.env.GMAILPW
                }
            });
            let mailOptions = {
                to: user.email,
                from: 'notstrangerdev@gmail.com',
                subject: 'Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, (err) => {
                console.log('Mail Sent');
                req.flash('success', 'An email has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function(err) {
        if(err) return next(err);
        res.redirect('/forgot');
    });
});

router.get('/reset/:token', (req, res) => {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
        if(!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/forgot');
        }
        res.render('reset', {token: req.params.token});
    });
});

router.post('/reset/:token', function(req, res) {
    async.waterfall([
        function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('back');
            }
            if(req.body.password === req.body.confirm) {
            user.setPassword(req.body.password, function(err) {
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
    
                user.save(function(err) {
                req.logIn(user, function(err) {
                    done(err, user);
                });
                });
            })
            } else {
                req.flash("error", "Passwords do not match.");
                return res.redirect('back');
            }
        });
        },
        function(user, done) {
        var smtpTransport = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
            user: 'notstrangerdev@gmail.com',
            pass: process.env.GMAILPW
            }
        });
        var mailOptions = {
            to: user.email,
            from: 'notstrangerdev@gmail.com',
            subject: 'Your password has been changed',
            text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
            req.flash('success', 'Success! Your password has been changed.');
            done(err);
        });
        }
    ], function(err) {
        res.redirect('/');
    });
});

module.exports = router;