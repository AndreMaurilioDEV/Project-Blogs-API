const { User } = require('../models');

const createUser = async ({ displayName, email, password, image }) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/;
  if (displayName.length < 8) {
    return { error: '"displayName" length must be at least 8 characters long' };
  }
  if (!emailRegex.test(email)) {
    return { error: '"email" must be a valid email' };
  }
  if (password.length < 6) {
    return { error: '"password" length must be at least 6 characters long' };
  }
  const userCreate = await User.create({ displayName, email, password, image });
  return userCreate;
};

const findAllUser = async () => {
  const users = User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return users;
};

const findUserPerID = async (id) => {
  const user = User.findOne({
    where: { id },
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return user;
};

module.exports = {
  createUser,
  findAllUser,
  findUserPerID,
};