var router = require('express').Router();
var mongoose = require('mongoose');
var User  = require('../models/user.model');
var passport = require('passport');
mongoose.set('useFindAndModify', false);

//return user by passing session id
router.get('/verify/:id', (req, res)=>{
        console.log(req.params.id);
        User.findById(req.params.id)
        .then( user => res.send({user: user, message: 'Token Verfied', success: true}) )
        .catch( err => res.send({err: err, message: 'Error', success: false}) );
});

router.post('/signup', passport.authenticate('local-signup', {session: false}), (req, res)=>{
    let user = req.user;
    res.send({name: user.name, email: user.email, contact: user.contact, auth: user._id});
});

router.post('/signin', passport.authenticate('local-signin', {session: false}), (req, res)=>{
    let user = req.user;
    res.send({name: user.name, email: user.email, contact: user.contact, auth: user._id});
});

module.exports = router;

// ***** DUMMY DATA ******
// {
// 	"username": "santa",
// 	"name": "smarpit",
// 	"email": "santa@gmail",
// 	"contact": "8849932932",
// 	"password": "santa123"
// }