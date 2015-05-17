var mongoose = require('mongoose');
    Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');

var userModel = Schema({
    email:{
        type: String
    },
    password:{
        type: String
    }
});

userModel.methods.toJSON = function() {
    var user = this.toObject();
    delete user.password;
    
    return user;
}

userModel.methods.comparePasswords = function(password, callback){
    bcrypt.compare(password, this.password, callback);
}


userModel.pre('save', function(next){
    var user = this;
    
    if(!user.isModified('password')) return next();
    
    bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err);
        
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err) return next(err);
            
            user.password = hash;
            next();
            
        });
    });
});


module.exports = mongoose.model('User', userModel);