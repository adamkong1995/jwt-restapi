const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./keys');

require('./passportService');

const app = express();

app.use(
  cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.COOKIE_KEY]
  })
);

app.use(cookieParser())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth')(app);
require('./routes/posts')(app);

app.listen(3000, () => console.log('running'))