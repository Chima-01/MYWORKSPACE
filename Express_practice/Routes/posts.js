const express = require('express');
const router = express.Router();

// router.use(express.json());
router.use(express.urlencoded({ extended: false }))

let posts = [
  { id: 1, title: 'Post One' },
  { id: 2, title: 'Post Two' },
  { id: 3, title: 'Post Three' }
];

router.get('/', (req, res, next) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(posts.slice(0, limit));
  } else {
    res.status(200).json(posts);
  }
});

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id );

  if (!post) {
    const error = new Error(`post with id of ${id} not found!`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json(post);
});

router.post('/', (req, res, next) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  }

  if (!newPost.title) {
    const error = new Error(`Please add a title`);
    error.status = 404;
    return next(error.message);
  }
  posts.push(newPost);
  res.status(201).json(posts);
});

router.put('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find( (post) => post.id === id);

  if (!post) {
    return res.status(404).json({ msg: `Post with id ${id} not found!`});
  }
  post.title = req.body.title;
  res.status(201).json(posts);
})


router.delete('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);

  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
});

module.exports = router;