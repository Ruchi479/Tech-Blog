const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
            model: Comment,
            attributes: ['content'],
        },
      ],
    });

    // Serialize data so the template can read it
    const post = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      post, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
            model: Comment,
            attributes: ['id', 'content', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
      ],
    });

    const Post = postData.get({ plain: true });

    res.render('Post', {
      ...Post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
      console.log(err);
    res.status(500).json(err);
  }
});

// ORGANIZATIONAL NOTE: Included this one withAuth route here to avoid adding commentRoutes.js file.
// Use withAuth middleware to prevent access to route
router.get('/updateComment/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const commentData = await Comment.findByPk(req.params.id, {
      where: { 
          id: req.params.id,
          user_id: req.session.user_id,
       },
    });

    const Comment = commentData.get({ plain: true });

    res.render('updateComment', {
      ...Comment,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });

module.exports = router;
