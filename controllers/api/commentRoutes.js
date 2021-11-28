const router = require('express').Router();
const { Comment, Article, User } = require('../../models');
const withAuth = require('../../utils/auth');



router.get('/', async (req, res) => {
    try{
        const commentData = await Comment.findAll({
            //join model user and Article like left join
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Article,
                    attributes: ['username'],
                },
            ],
            where: {
                article_id: req.params.id,
            },
            order: [['created_at', 'ASC']],
        });

        const comments = commentData.map((comment) => comment.get({plain:true}));

        res.render('comment', {
            comments,
            logged_in: req.session.logged_in
        });
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});

///api/comments/id GET COMMENT
router.get('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findOne({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if(!commentData){
            res.status(404).json({message: 'No comment found with this ID'});
            return;
        }
  
        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

//CREATE COMMENT
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});


//UPDATE COMMENT
router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update(
            {
                content: req.body.commentContent,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        if(!commentData){
            res.status(404).json({message: 'No comment found with this ID'});
            return;
        }
  
        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// DELETE COMMENT /api/comments/id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if(!commentData){
            res.status(404).json({message: 'No comment found with this ID!'});
            return;
        }
  
        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = router;
