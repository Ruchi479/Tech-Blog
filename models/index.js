//import all models
const User= require('./User');
const Post= require('./Post');
const Comment= require('./Comment');

//create association
//user can make many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//a post can only belong to one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

//Comment can only belong to one user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

//a particular comment can only belong to one post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

//user can make many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

//a post has many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Comment};