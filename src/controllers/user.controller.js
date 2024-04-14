const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
const { User } = require('../models');

const jwtConfig = {
  expiresIn: '55m',
  algorithm: 'HS256',
};
const secret = process.env.JWT_SECRET || 'secret';
const emptyValues = (value) => (
  value == null || (typeof value === 'string' && value.trim().length === 0)
); 
const createUserController = async (req, res) => {
  if (emptyValues(req.body.email) || emptyValues(req.body.password)) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  const users = await User.findOne({ where: { email: req.body.email } });
  if (!users) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  const { id, password } = users.dataValues;
  const isValidPass = req.body.password === password;
  const token = jwt.sign({ data: { userId: id } }, secret, jwtConfig);
  if (!isValidPass) {
    return res.status(400).json({ message: 'Invalid fields' });
  } 
  return res.status(200).json({ token });
};

const userValidation = async (req, res) => {
  const userFindAll = await User.findAll();
  const userExists = userFindAll.some((user) => user.dataValues.email === req.body.email);
  if (userExists) {
    return res.status(409).json({ message: 'User already registered' });
  }
  const users = await userService.createUser(req.body);
  if (users.error) {
    return res.status(400).json({ message: users.error });
  }
  const { id } = users.dataValues;
  const token = jwt.sign({ data: { userId: id } }, secret, jwtConfig);
  return res.status(201).json({ token });
};
const getAll = async (_req, res) => {
  const users = await userService.findAllUser();
  return res.status(200).json(users);
};
const getPerID = async (req, res) => {
  const { id } = req.params;
  const user = await userService.findUserPerID(id);
  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  } 
  return res.status(200).json(user);
};
module.exports = {
  createUserController, getAll, userValidation, getPerID,
};