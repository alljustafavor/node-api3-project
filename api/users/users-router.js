const express = require('express');
const User = require('./users-model.js');
const Post = require('../posts/posts-model.js');
const { validateUserId, validateUser,validatePost } = require('../middleware/middleware.js');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.get()
  res.status(200).json(Object.values(users))
});

router.get('/:id', validateUserId, (req, res, next) => {
  res.json(req.user);
});

router.post('/', validateUser, (req, res, next) => {
  User.insert(req.body)
    .then(us => {
      res.status(201).json(us);
    })
    .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  User.update(req.params.id, { name: req.name })
    .then(us => {
      res.status(200).json(us);
    })
    .catch(next)
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  try {
    await User.remove(req.params.id)
    res.json(req.user)
  } catch(err) {
    next(err)
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try {
    let posts = await User.getUserPosts(req.params.id);
    res.json(posts);

  } catch(err) {
    next(err)
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  try {
    const result = await Post.insert({
      user_id: req.params.id,
      text: req.text, 
    });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
