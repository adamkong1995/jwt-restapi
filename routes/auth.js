const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../keys');

module.exports = app => {
  app.get('/auth', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html>
        <head>
        </head>
        <body>
            <form method='post' action='/auth'>
                <input type='text' name='username' id='username'/>
                <input type='password' name='password' id='password'/>
                <button type='submit'>Submit</button>
            </form>
        </body>
    </html>`)
  })

  app.post('/auth', (req, res) => {
    const token = jwt.sign({name: 'adam'}, 
      keys.JWT_SECRET,
    {  issuer: keys.JWT_ISSUER, audience: keys.JWT_AUDIENCE }
    )
        res.cookie('jwt', token)
        res.send('success')
  })


  app.get('/secret', passport.authenticate('jwt', {session:false}), (req, res) => {
    res.json({user: req.user});
  });


  app.get('/logout', (req, res, ) => {
    res.clearCookie("jwt");
    res.send('done')
  });
}
