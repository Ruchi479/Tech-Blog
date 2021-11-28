//import all models
const User= require('./User');
const Article= require('./Article');
const Comment= require('./Comment');

//create association
//user can make many Articles
User.hasMany(Article, {
    foreignKey: 'user_id'
});

//a Article can only belong to one user
Article.belongsTo(User, {
    foreignKey: 'user_id'
});

//Comment can only belong to one user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

//a particular comment can only belong to one Article
Comment.belongsTo(Article, {
    foreignKey: 'article_id'
});

//user can make many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

//a Article has many comments
Article.hasMany(Comment, {
    foreignKey: 'article_id'
});

module.exports = { User, Article, Comment};