const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller')
const passport = require('passport')

router.get("/profile", passport.checkAuthentication, userController.profile);
router.get("/signup", userController.signup);
router.get("/signin", userController.signin);

router.post("/create", userController.create);
router.post("/create-session",
passport.authenticate("local", { failureRedirect: "/users/signin" }),
  userController.createSession
);

router.get('/signout', userController.destorySession);

module.exports = router;