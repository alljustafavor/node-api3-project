const User = require('../users/users-model.js');

function logger(req, res, next) {
  const date = new Date(Date.now());
  console.log(`${req.method}, ${req.originalUrl, date.toString()}`);
  next();
}

async function validateUserId(req, res, next) {
  let user = await User.getById(req.params.id);
  if (!user) return res.status(404).json({ message: 'user not found'});
}

function validateUser(req, res, next) {
  if (typeof req.body.name !== 'string' || req.body.name.trim() === '') {
    return res.status(400).json({ message: 'missing required name field'});
  }
  next();
}

function validatePost(req, res, next) {
  if (!req.body.text) return res.status(400).json({ message: 'missing required text field'})
  req.post = req.body.text;
  next();
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}

