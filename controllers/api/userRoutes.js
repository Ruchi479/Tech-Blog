const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require("../../utils/auth");

//get/api/ all users
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET /api/users/1
router.get("/:id", async (req, res) => {
  try {
    const dbuserData = await User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Post,
          attributes: ["id", "title", "post_content", "created_at", "updated_at"],
        },
        {
          model: Comment,
          attributes: ["id", "content", "created_at"],
          include: {
            model: Post,
            attributes: ["title"],
          },
        },
      ],
    });
    if (!dbUserData) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      //req.body
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = dbUserData.username;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
      console.log(err);
    res.status(400).json(err);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'Success! You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT /api/users/1
router.put("/:id", withAuth, async (req, res) => {
  try {
    const dbUserData = await User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    });

    if (!dbUserData[0]) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    res.json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//LOGOUT
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// DELETE /api/users/1
// router.delete("/:id", withAuth, async (req, res) => {
//   try {
//     const dbUserData = await User.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (!dbUserData) {
//       res.status(404).json({ message: "No user found with this id" });
//       return;
//     }
//     res.status(200).json(dbUserData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;
