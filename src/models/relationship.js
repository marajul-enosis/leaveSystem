const leave = require('../models/leave');
const user = require('../models/user');

leave.belongsTo(user,{foreignKey: 'userId',targetKey:'id'});
user.hasMany(leave,{as: 'leave', foreignKey: 'userId',  sourceKey: 'id'});