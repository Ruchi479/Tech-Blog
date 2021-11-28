const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const articleRoutes = require('./articleRoutes.js');
const commentRoutes = require('./commentRoutes.js');
//const homeRoutes = require('./homeRoutes');

router.use('/users', userRoutes);
router.use('/articles', articleRoutes);
router.use('/comments', commentRoutes);

module.exports = router;