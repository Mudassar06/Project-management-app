require("dotenv").config()
const router = require("express").Router();
const passport = require("passport");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

// router.use(
//     session({
//       secret: uuidv4(),
//       resave: false,
//       saveUninitialized: false,
//     //   cookie: { maxAge: 1000 * 60 * 60 * 24 },
//     })
// );
  
// router.use(passport.initialize());
// router.use(passport.session());

const {ensureAuth} = require("../auth/auth")

//Auth Login
router.get("/login",(req,res)=>{
    res.send("<html><a href = '/auth/google'>Login using google</a>");
});

//Auth Logout
router.get("/logout",(req,res)=>{
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        req.session.destroy((err) => {
          if (err) {
            console.error("Error destroying session:", err);
          }
          res.redirect("/");
        });
      });
});

//Auth with google
router.get("/google",passport.authenticate('google', { scope: ['profile'] }));

router.get("/google/callback", passport.authenticate('google'),function(req, res) {
    res.send(req.user);
});

module.exports = router;