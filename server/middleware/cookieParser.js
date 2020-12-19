const hashUtils = require('../lib/hashUtils');

const parseCookies = (req, res, next) => {

  if (req.headers.cookie) {
    let cookieArr = req.headers.cookie.split('; ');
    let cookies = {};
    cookieArr.forEach((cookie) => {
      let splitCookie = cookie.split('=');
      cookies[splitCookie[0]] = splitCookie[1];
    });
    req.cookies = cookies;
  }
  //this belongs in sessions:
  //  else {
  //   req.cookies = {shortlyid: hashUtils.createHash(hashUtils.createRandom32String())}
  // }
  next();
};

module.exports = parseCookies;