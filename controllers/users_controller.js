const User = require("../models/user");
const fs = require('fs');
const path = require('path');

// let's keep it same as before
module.exports.profile = function (req, res){

  User.findById(req.params.id, function(err, user){

    return res.render("user_profile", {

      title: "User Profile",
      profile_user: user
    
    });
  
  })

};

module.exports.update = async function(req, res){

  if (req.user.id == req.params.id){
    try{

      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function(err){
        if(err){console.log('********Multer Error : ', err)}
        user.name = req.body.name;
        user.email = req.body.email;
        console.log(req.file)

        if(req.file){

          if(user.avatar){
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          //this is saving the path fo the uploaded file into the avatar field in the user
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");

      });





    }catch(err){
      req.flash('error', err);
      return res.redirect('back');
    }

  

  }else{
    return res.satus(401).send('unauthorized')
    
  }

}



// render the sign up page
module.exports.signup = function (req, res) {
  console.log('req', req.user)
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("signup", {
    title: "Codeial | Sign Up",
  });
};

// render the sign in page
module.exports.signin = function (req, res) {
   if (req.isAuthenticated()) {
     return res.redirect("/users/profile");
   }
  return res.render("signin", {
    title: "Codeial | Sign In",
  });
};

// get the sign up data
module.exports.create = function (req, res) {
  console.log('req', req)
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }
        return res.redirect("/users/signin");
      });
    } else {
      return res.redirect("back")
      }
  });
};
// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  req.flash('success', 'Logged in successfully')
  return res.redirect("/");
};

module.exports.destorySession = function(req, res){
  req.logout(function (err) {

    if (err) {
      return next(err);
    }
   
    req.flash("success", "Logged out in successfully");
    res.redirect("/");
  });

}