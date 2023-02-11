const express = require('express');
const cookieParser = require('cookie-parser');
const app = express()
const port = 3000
const expressLayouts = require('express-ejs-layouts');
const db = require("./config/mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocal = require('./config/passport-local-strategy')
const passportJwt = require("./config/passport-jwt-strategy")
const passportGoogle = require("./config/passport-google-oauth2-strategy")

const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const customMware = require('./config/middleware')

// setup the chat server to be used with socket.io
const chatServer = require("http").createServer(app);
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat server is listening on port 5000 ")


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'))
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(expressLayouts);

//extract style and scripts from sub page into the layout
app.set('layout extractStyles', true)
app.set("layout extractScripts", true)



app.set('view engine', 'ejs');
app.set('views', './views');
//mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "codeial",
    // todo change the secret before deployment in production mode
    secret: "xyz",
    saveUninitialized: false, // user hasn't loggedin, i don't want to save data in session cookies
    resave: false, // when identiy is essablished or somesort of session data avaliable, do not want to change if data session as it is
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://0.0.0.0:27017/codeial",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash)
//use express router
app.use('/', require('./routes/index'))



app.listen(port, (err) => {
    if(err){
        console.log('Somthing went wrong with port', err)
    }
  console.log(`Server running on port ${port}`)
})