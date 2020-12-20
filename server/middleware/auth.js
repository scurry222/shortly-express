const models = require('../models');
const Promise = require('bluebird');

//navigate to /
//parse cookies
//no matching cookie?
//log in & sign up
//as soon as someone logs in, create session

//parse cookies
//create session
//create user --> (id, name)
//TAP create session --> modifies req with session hash
//update session table entry w/ user id (makes future cookie lookups valid)
//attach cookie to response using hash

// module.exports.createSessionAsync = Promise.promisify(createSession);
// resolve/reject
// return Promise.resolve(req.cookies.shortlyId)

var createSession = (req, res, next) => {
  return new Promise((resolve, reject) => {
    if (req.cookies && Object.keys(req.cookies).length > 0) {
      console.log('cookie found!', req.cookies);
      next();
    } else {
      return models.Sessions.create()
        .then(({ insertId }) => {
          return models.Sessions.get({ id: insertId });
        })
        .then(({ hash }) => {
          req.session = { hash };
          //add to response.cookies.shortlyid
          res.cookie('shortlyId', { hash });

          next();
        })
        .error((err) => {
          // res.status(404);
          next();
        });
    }
  });
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/


