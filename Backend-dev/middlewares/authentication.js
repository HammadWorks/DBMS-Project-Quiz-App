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

module.exports = {
  verifyTokenMiddleWareForAuthentication,
};
