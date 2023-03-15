const user = require('../models/user');
var userDao = {
    findAll: findAll,
    create: create,
    findById: findById,
    deleteById: deleteById,
    updateUser: updateUser,
    findByEmail: findByEmail,
    CountByEmail: CountByEmail
}

function findAll() {
    return user.findAll({
        order: [
            ['id', 'ASC'],
        ]
    });
}

function findById(id) {
    return user.findByPk(id);
}

function CountByEmail(email) {
    // console.log(email)
    return user.count({where:{
        email:email
    }});
}

async function findByEmail(email) {
    return await user.findOne({where:{
        email:email
    }});
}

function deleteById(id) {
    return user.destroy({ where: { id: id } });
}

function create(gig) {
    var newGig = new user(gig);
    return newGig.save();
}

function updateUser(updateuser, id) {
    return user.update(updateuser, { where: { id: id } });
}
module.exports = userDao;