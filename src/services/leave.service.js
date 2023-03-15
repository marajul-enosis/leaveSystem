const leave = require('../models/leave');
const { Op } = require("sequelize");
var leaveService = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateUser: updateUser,
    findByEmail: findByEmail,
    countByDate: CountByDate,
    findByUserId: findByUserId
}

function findAll() {
    return leave.findAll();
}

function findById(id) {
    return leave.findByPk(id);
}

function findByUserId(id) {
    return leave.findAll({where:{
        userId:id
    }});
}

function CountByDate(id,from,to) {
    // console.log(email)
    return leave.count({where:{
        userId:id,
        from:{
            [Op.and]:{
                [Op.gte]:from,
                [Op.lte]: to
            }
            
        }
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
module.exports = leaveService;