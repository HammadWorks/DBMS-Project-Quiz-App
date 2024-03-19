const { Router } = require("express");
const {
  handleSignInRequest,
  handleSignUpRequest,
} = require("../controllers/user");
const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.post("/signin", handleSignInRequest);

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signup", handleSignUpRequest);

router.get("/logout", (req, res) => {
  return res.clearCookie("token").redirect("/");
});

module.exports = router;
