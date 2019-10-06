 let passport = require('passport'), localStrategy = require('passport-local').Strategy;
 let User = require('../models/user.model');

 passport.use('local-signin',new localStrategy(
     function(username, password, done) {
        User.findOne({username: username})
        .then(user => {
            if(!user) return done(null, false, {message: 'Username not found!'});

            user.validPassword(password)
            .then(res => {
                if(!res)   return done(null, false, 'Password Incorrect!');
                else return done(null, user);
            });

        })
        .catch(err => {return done(err)});
        
     }
 ))

 passport.use('local-signup',new localStrategy({
    passReqToCallback: true
 },
    function(req, username, password, done) {
       User.findOne({email: req.body.email})
       .then(user => {
           if(user) return done(null, false, {message: 'Email already taken!'});
           
           const newUser = new User({
            name:req.body.name,
            email:req.body.email,
            contact:req.body.contact,
            username,
            password
        });
    
        console.log(newUser);
        
        newUser.save()
        .then( user => { return done(null, user) })
        .catch( err => { return done(err, false, {}) });
        

       })
       .catch(err => {return done(err)});
       
    }
))

module.exports = passport;