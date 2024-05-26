require("dotenv").config();

const accessTokenExpireTime = 1 * 60 * 1000; // 1min

function getAccessTokenOpts() {
  return {
    secret: process.env.ACCESS_TOKEN_SECRET,
    tokenOpts: {
      expiresIn: accessTokenExpireTime / 1000,
    },
    cookieOpts: {
      expires: accessTokenExpireTime,
    },
  };
}

module.exports = {
  getAccessTokenOpts,
};
