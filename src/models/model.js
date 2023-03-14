const {DataTypes} = require('sequelize');
const db = require('../configs/db.config');
const {hash} = require('../helpers/common.helper')
// const user = require('./user')

const leave = db.define('leave',{
    // define a user 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    from: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    to: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    reason:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    emergencyContact:{
        type: DataTypes.STRING,
        allowNull: false,
    },

});

const user = db.define('user',{
    // define a user 
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    supervisor:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateOfBirth:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: [4, 100], 
            //should have both letter and digit
            isAlphanumeric: true,
            
        },
        set(value){
            this.setDataValue('password',hash(value));
        }
    }

});

leave.belongsTo(user,{foreignKey: 'userId',targetKey:'id'});
user.hasMany(leave,{as: 'leave', foreignKey: 'userId',  sourceKey: 'id'});

module.exports = {
    leave,user
}
