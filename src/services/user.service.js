const { User } = require('../models/');

/*const createUser = async ({email, password}) => {
    const userCreate = User.create({email, password});
    return userCreate;
};*/

const createUser = async ({displayName, email, password, image}) => {
    const userCreate = User.create({displayName, email, password, image});
    return userCreate;
};

const findAllUser = async () => {
    const users = User.findAll({
        attributes: ['id', 'displayName', 'email', 'image']
    });
    return users;
};


const findUserPerID = async (id) => {
    const user = User.findOne({
        where: {id},
        attributes: ['id', 'displayName', 'email', 'image']
    });
    return user;
};

module.exports = {
    createUser,
    findAllUser,
    findUserPerID,
};