const { validateToken } = require("../services/authentication");

function verifyTokenMiddleWareForAuthentication(cookieName) {
  return (req, res, next) => {
    const cookieValue = req.cookies[cookieName];
    if (!cookieValue) return next();
    try {
      const userPayload = validateToken(cookieValue);
      req.user = userPayload;
    } catch (error) {}

    return next();
  };
}

function userLoginCheck(req, res, next) {
  if (!req.user) return res.redirect("/user/signup");
  next();
}

module.exports = {
  verifyTokenMiddleWareForAuthentication,
  userLoginCheck,
};
