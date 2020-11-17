const passport = require('passport');

const postList = ['post1'];

module.exports = app => {
  app.get('/posts', passport.authenticate('jwt', {session:false}), (req, res) => {
    res.send(postList);
  });

  app.post('/posts', passport.authenticate('jwt', {session:false}), (req, res) => {
    if(!req.body.post) {
      res.status(400).send('Please include a post');
    };

    postList.push(req.body.post);
    res.send(postList);
  });

  app.delete('/posts', passport.authenticate('jwt', {session:false}), (req, res) => {
    postList.pop();
    res.send(postList);
  });

  app.put('/posts', passport.authenticate('jwt', {session:false}), (req, res) => {
    if(!req.body.post || !req.body.index) {
      res.status(400).send('Please include a post and an index');
    };

    postList[req.body.index] = req.body.post;
    res.send(postList);
  });
};