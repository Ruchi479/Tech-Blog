const sequelize = require('../config/connection');
const { User, Article, Comment} = require('../models');

const userData = require('./user-seed.json');
const articleData = require('./article-seed.json');
const commentData = require('./comment-seed.json');

const seedDatabase = async () => {

    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    console.log("\n----- USERS SEEDED -----\n");


    await Article.bulkCreate (articleData);
    console.log("\n----- POSTS SEEDED -----\n");

    await Comment.bulkCreate(commentData)
    console.log("\n----- COMMENTS SEEDED -----\n");

  process.exit(0);
};

seedDatabase();