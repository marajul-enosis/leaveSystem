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
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate:{
            ValidateFromTodateRange(value){
                if(value>this.to){
                    throw new Error('To date must be greater that From')
                }
            }
        }
    },
    to: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    reason:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    emergencyContact:{
        type: DataTypes.STRING,
        allowNull: false,
    },

});




module.exports = leave
