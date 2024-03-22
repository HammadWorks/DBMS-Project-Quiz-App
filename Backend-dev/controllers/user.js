const User = require("../models/user");
const { createTokenForUser } = require("../services/authentication");

async function handleSignInRequest(req, res) {
  const body = req.body;
  if (!body) return res.redirect("/user/signin");
  await User.create({
    fullName: body.fullName,
    email: body.email,
    password: body.password,
  });
  return res.send("Signin in Successfully");
}

async function handleSignUpRequest(req, res) {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (!user)
    return res.status(404).render("signup", { signinEmailError: "User Not Found!" });
  if (user.password === body.password) {
    const token = createTokenForUser(user);
    return res.cookie("token", token).redirect("/");
  }
  return res.render("signup", { signinPasswordError: "Incorrect Password!" });
}
module.exports = {
  handleSignInRequest,
  handleSignUpRequest,
};
