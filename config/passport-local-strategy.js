const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')

passport.use(new LocalStrategy({
  usernameField: 'email',passReqToCallback:true
},function (req, email, password, done) {
    User.findOne({ email: email}, function (err, user) {
      if (err) {
        req.flash('error', err)
        console.log("Error in finding user--> passport");
        return done(err);
      }
      if (!user || user.password != password) {
        req.flash('error', 'Invalid Username/Password')
        console.log('Invaild username/password')
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

// serializing the user to decide which key is to kept in the cookies.

passport.serializeUser(function(user, done){
    done(null, user.id)
})

//deserlizing the user from the key in the cookies.
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> passport- deserlize')
        }
        return done(null, user)
    })
})

//check if the user is authenticated
//using as middleware
passport.checkAuthentication = function(req, res, next){
  // if the suer is signed in, then pass on the req to the next function(controller's, action)
  if (req.isAuthenticated()){
    return next();
  }

  // if the user is not signed in
  return res.redirect('/users/signin')
}

passport.setAuthenticatedUser = function(req, res, next){
  if (req.isAuthenticated()){
    // req.user contains the current signed in the user from the session cookies and we are just sending to this to the locals for the views   
    res.locals.user = req.user;
  }
  next();
};



module.exports = passport;