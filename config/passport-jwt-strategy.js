const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require("../models/user");

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : "codeial",
}

passport.use(new jwtStrategy(opts, function(jwt_payload, done){
    User.findOne(jwt_payload._id, function(err, user){
        if(err){console.log(err, "error in finding user from jwt"); return}
        
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        };
    
    });
}));

module.exports = passport;



