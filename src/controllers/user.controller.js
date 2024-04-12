const userService = require('../services/user.service');
const { User } = require('../models/');
const jwt = require('jsonwebtoken');

const jwtConfig = {
    expiresIn: '55m',
    algorithm: 'HS256',
};
  
const secret = process.env.JWT_SECRET || 'secret';

const emptyValues = (value) => {
  return (value == null || (typeof value === "string" && value.trim().length === 0));
} 
const createUserController = async (req, res) => {
    if (emptyValues(req.body.email)|| emptyValues(req.body.password)) {
        return res.status(400).json({message: "Some required fields are missing"});
    };
    const users = await User.findOne({ where: { email: req.body.email } });
    if (!users) {
        return res.status(400).json({message: "Invalid fields"});
    }
    const password = users.dataValues.password;
    const isValidPass = req.body.password === password;
    const { id } = users.dataValues;
    const token = jwt.sign({data: { userId: id}}, secret, jwtConfig)
    if (!isValidPass) {
        return res.status(400).json({message: "Invalid fields"});
    } else {
        return res.status(200).json({token});
    };
};

const userValidation = async (req, res) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/;
  if (req.body.displayName.length < 8) {
    return res.status(400).json(
      {message: '"displayName" length must be at least 8 characters long'})
  };
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json(
      {message: '"email" must be a valid email'})
  };
  if (req.body.password.length < 6) {
    return res.status(400).json(
      {message: '"password" length must be at least 6 characters long'})
  };
  const userFindAll = await User.findAll();
  const userExists = userFindAll.some(user => user.dataValues.email === req.body.email);
  if (userExists) {
    return res.status(409).json({message: "User already registered"});
  }
  const users = await userService.createUser(req.body);
  const { id } = users.dataValues;
  const token = jwt.sign({data: { userId: id}}, secret, jwtConfig)
  return res.status(201).json({token})
};

const getAll = async (_req, res) => {
    try {
      const users = await userService.findAllUser();
      const { id } = users.some(user => user.dataValues);
      const token = jwt.sign({data: { userId: id}}, secret, jwtConfig)
      return res.status(200).json(users);
    } catch (e) {
      res.status(500).json({ message: 'Ocorreu um erro' });
    }
};

const getPerID = async (req, res) => {
  const { id } = req.params;
  const user = await userService.findUserPerID(id);
  if (!user) {
    return res.status(404).json({message: 'User does not exist'});
  } 
    return res.status(200).json(user);
};


module.exports = {
    createUserController,
    getAll,
    userValidation,
    getPerID
}