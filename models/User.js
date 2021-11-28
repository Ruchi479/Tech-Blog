const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//create User model
class User extends Model {
    //set up method to run on instance data(as per) to check password
    checkPassword(signinPW){
        return bcrypt.compareSync(signinPW, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull:false,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                len: [8]
            },
        },
    },
    
    {
        hooks: {
            //set up beforecreate hook to work with data before a new instance is created
            beforeCreate: async (newUserData) => {
                //hash the password
              newUserData.password = await bcrypt.hash(newUserData.password, 10);
              return newUserData;
            },
            //setup before update hook functionality
            beforeUpdate: async (updatedUserData) => {
                //hash the password 
              updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
              return updatedUserData;
            },
        },
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'User'
    }
);

module.exports= User;