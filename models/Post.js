const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

//create Post model
class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull:false,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                len: [1]
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull:false,
            validate: {
                len: [1]
            }
        },
        created_at: {
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue: DataTypes.NOW, 
        },
        updated_at: {
            type:DataTypes.DATE,
            defaultValue: "",
            onUpdate: DataTypes.NOW,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'Post'
    }
);

module.exports= Post;