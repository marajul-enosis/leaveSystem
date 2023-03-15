const leave = require('../models/leave');
const { Op } = require("sequelize");
var leaveDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateUser: updateUser,
    findByEmail: findByEmail,
    CountByEmail: CountByEmail
}

function findAll() {
    return leave.findAll();
}

function findById(id) {
    return leave.findByPk(id);
}

function CountByDate(id,from,to) {
    // console.log(email)
    return leave.count({where:{
        userId:id,
        from:[]
    }});
}

async function findByEmail(email) {
    return await user.findOne({where:{
        email:email
    }});
}

function deleteById(id) {
    return leave.destroy({ where: { id: id } });
}

function create(gig) {
    var newGig = new leave(gig);
    return newGig.save();
}

function updateUser(user, id) {
    var updateuser = {
        name: user.name,
    };
    return Gig.update(updateuser, { where: { id: id } });
}
module.exports = leaveDao;