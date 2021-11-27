const router = require('express').Router();
const { Article, User} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: {
        model: User,
        attributes: ['username'],
      },
      where: {
        user_id: req.session.user_id,
      },
    });

    const post = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/newPost', withAuth, async (req, res) => {
  if (req.session.logged_in) {
    res.render('newPost');
  } else {
  res.redirect('/signin');
  }
});

router.get('/updatePost/:id', withAuth, async (req, res) => {  
  try {
    const postData = await Article.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    const article = postData.get({ plain: true });

    res.render('updatePost', {
      article,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;