const {DataTypes} = require('sequelize');
const db = require('../configs/db.config');
const {hash} = require('../helpers/common.helper')
const {leave} = require('./leave');


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
        validate:{
            len: [2, 100],

        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: [2, 100],
             
        }
    },
    supervisor:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: [2, 100],
             
        }
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

module.exports = user;
