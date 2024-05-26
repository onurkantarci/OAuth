const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { getAccessTokenOpts } = require("../config/token-options");
const User = require("../models/user.model");

function authenticateToken(req, res, next) {
  const token = req.cookies.accessToken;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
router.get("/users", authenticateToken, async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (accessToken) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (refreshToken == null) {
    res.status(401).send("Access token not found");
  } else {
    if (!refreshTokens.includes(refreshToken)) {
      res.status(403).send("Refresh token invalid");
      return;
    }
    res.status(401).send("Access token not found");
  }
});

router.get("/me", (req, res) => {
  const cookies = req.cookies;
  res.send(cookies);
});

router.get("/logout", (req, res) => {
  res.clearCookie("accessToken");

  res.send({ message: "Logged out successfully" });
});

router.get("/status", (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (accessToken) {
    res.send({ isAuthenticated: true });
  } else {
    res.send({ isAuthenticated: false });
  }
});

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/redirect",
  passport.authenticate("github", { session: false }),
  (req, res) => {
    const accessTokenOpts = getAccessTokenOpts();
    const cookieOptions = {
      maxAge: accessTokenOpts.cookieOpts.expires,
    };
    res.cookie("accessToken", req.user.accessToken, cookieOptions);

    res.redirect("http://localhost:5173");
  }
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
    session: false,
  }),
  (req, res) => {
    console.log({ firstAuthGoogl: 1 });
  }
);

router.get(
  "/google/redirect",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    console.log({ secondAuthGooglRedirect: 1 });
    console.log({ currentUser: req.user });

    const accessTokenOpts = getAccessTokenOpts();
    const cookieOptions = {
      maxAge: accessTokenOpts.cookieOpts.expires,
    };
    res.cookie("accessToken", req.user.accessToken, cookieOptions);

    res.redirect("http://localhost:5173");
  }
);

module.exports = router;
