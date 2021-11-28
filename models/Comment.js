const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull:false,
            autoIncrement: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull:false,
            // validate: {
            //     len: [1]
            // }
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,

        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        article_id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: 'article',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'Comment'
    }
);

module.exports= Comment;