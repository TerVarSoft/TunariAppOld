var express = require('express');
    mongoose = require('mongoose');
    bodyParser = require('body-parser');
var app = express();
var jwt = require('./services/jwt.js');
//var jwt = require('jwt-simple');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Product = require('./models/productModel');
var User = require('./models/userModel');



productRouter = require('./routes/productRoutes')(Product);
userRouter = require('./routes/userRoutes')(User);

var db = mongoose.connect('mongodb://localhost/productAPI');
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(passport.initialize());

passport.serializeUser(function(user, done){
    done(null, user.id);
});




app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.0.101:9000');
    //res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



app.use('/api/products', productRouter);
app.use('/api/register', userRouter);

app.get('/', function(req, res){
	res.send('welcome to my api');
});

var printers = [
    'Novedades',
    'Veloz',
    'Del Vicente'
]
app.get('/api/printers', function(req, res){
   
    console.log(req.headers.authorization);
    if(!req.headers.authorization){
        console.log("soy null");
        return res.status(401).send({
            message: 'you are not authorized'
        });
    }
    
    var token = req.headers.authorization.split(' ')[1];
     console.log(token);
    var payload = jwt.decode(token,"shh...");
    
    if(!payload.sub)
       res.status(401).send({message:'Authenticaction failed'});
    
    
	res.json(printers);
});

app.post('/api/login', passport.authenticate('local-login'), function(req, res){   
        
            createSendToken(req.user, res);  
});

var strategyOptions = {
    usernameField:'email'
};

var loginStrategy = new LocalStrategy(strategyOptions,
    function(email, password, done){
        var searchUser = {
            email: email
        };
        User.findOne(searchUser, function(err, user){
        if(err) return done(err);
        
        if(!user)
            return done(null, false, {messages: 'Wrong email/password'});
        console.log(user);
        user.comparePasswords(password, function(err, isMatch){
            if(err) return done(err);
            
            if(!isMatch)
                return done(null, false, {messages: 'Wrong email/password'});
                
            //createSendToken(user, res);
            return done(null, user);
            
        });
    });
    }                             
 );

/*var registerStrategy = new LocalStrategy(strategyOptions, function(email, password){
    var newUser = new User({
                email: email,
                password: password
            });
    newUser.save(function (err){
        done(null, newUser);
    });
});

passport.use('local-register', registerStrategy);*/
passport.use('local-login', loginStrategy);

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

app.use(express["static"](__dirname + '/public'));



app.listen(port, '0.0.0.0', function(){
//app.listen(port, function(){    
	console.log('Running on PORT: ' + port);
});