const JwtStrategy = require('passport-jwt').Strategy;
const passport = require('passport');
const keys = require('./keys');

var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
      token = req.cookies['jwt'];
  }
  return token;
};

var opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = keys.JWT_SECRET;
opts.issuer = keys.JWT_ISSUER;
opts.audience = keys.JWT_AUDIENCE;
opts.algorithms = keys.JWT_ALGORITHMS;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  // Search the user record in db...

  return done(null, 'test');
}));