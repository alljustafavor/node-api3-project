const User = require('../users/users-model.js');

function logger(req, res, next) {
  const date = new Date(Date.now());
  console.log(`${req.method}, ${req.originalUrl, date.toString()}`);
  next();
}

async function validateUserId(req, res, next) {
  let user = await User.getById(req.params.id);
  if (!user) {
    res.status(404).json({ message: 'user not found'});
  }
  req.user = user;
  next();
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (typeof name !== 'string' || name.trim() === '') {
    res.status(400).json({ message: 'missing required name field'});
  }
  req.name = name.trim();
  next();
}

function validatePost(req, res, next) {
  const { text } = req.body;
  if (!text || !text.trim()) {
    res.status(400).json({
    message: 'missing required text field'
    })

  } else {
    req.text = text.trim()
    next()
  }
 }

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}

