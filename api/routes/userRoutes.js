var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('../services/jwt.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = function(User){
    
    var strategyOptions = {
        usernameField:'email'
    };
    
    var registerStrategy = new LocalStrategy(strategyOptions, function(email, password, done){
        var searchUser = {
            email: email
        };
        User.findOne(searchUser, function(err, user){
            if(err) return done(err);

            if(user)
                return done(null, false, {messages: 'Email already exist'});

            var newUser = new User({
                        email: email,
                        password: password
                    });
            newUser.save(function (err){
                done(null, newUser);
            });
        });
    });
    passport.use('local-register', registerStrategy);
    
    var userRouter = express.Router();
    
    userRouter.route('/')
        .post(passport.authenticate('local-register'), function(req, res){
            console.log('estoy aquiiiii');
            createSendToken(req.user, res);
            
        })
        .get(function(req,res){
                    User.find({}, function(err, users){
                        res.json(users);
                })
        });
    
    function createSendToken(user, res){
        var payload = {
            sub: user.id
        };
        var token = jwt.encode(payload, "shh...");

        res.status(200).send({
            user: user.toJSON(),
            token: token
        });
    }

    return userRouter;
};



module.exports = routes;