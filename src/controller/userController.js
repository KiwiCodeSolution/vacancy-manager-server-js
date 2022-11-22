const UserModel = require("../dbMongo/models/userModel");

module.exports.createUser = async (req, res) => {
  console.log(req.body);
  const { body } = req;
  const user = await UserModel.create(body);
  res.status(201).send({ data: user });
};

module.exports.getUsers = async (req, res) => {
  const getUsers = await UserModel.find();
  res.status(200).send({ data: getUsers });
};

module.exports.login = async (req, res) => {
  res.json({ request: req.body });
};

module.exports.logout = async (req, res) => {
  res.json({ request: req.body });
};

module.exports.currentUser = async (req, res) => {
  const { name, email } = req.user;
  res.json({ user: { name, email } });
};
