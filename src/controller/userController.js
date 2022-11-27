const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../config/config");
const UserModel = require("../dbMongo/models/UserModel");

const generateAccessToken = (id, username) => {
  const payload = {
    id,
    username
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

module.exports.registration = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "ошибка при валидации", errors });
  };
  const { username, password, email } = req.body;
  const candidate = await UserModel.findOne({ email });
  if (candidate) {
    return res.status(400).json({ message: "пользователь с таким именем уже существует" });
  };

  const hashPassword = bcrypt.hashSync(password, 7);
  const user = new UserModel({ username, password: hashPassword, email, userToken: " " });
  await user.save();
  return res.json({ message: "Пользователь успешно зарегестрирован" });



};


module.exports.login = async (req, res) => {

  const { username, password, email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: `пользователь ${username} не найден ` });
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {

    return res.status(400).json({ message: "введен не верный пароль" });

  }
  const token = generateAccessToken(user._id, username);

  user.userToken = token;
  await user.save();

  return res.json({ token });


};

module.exports.logout = async (req, res) => {

  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  user.userToken = "";
  await user.save();
  return res.json({ message: "User logOut" });

};

module.exports.getUser = async (req, res) => {
  const getUsers = await UserModel.find();
  res.status(200).send({ data: getUsers });
};



// module.exports.logout = async (req, res) => {

// }

// module.exports.currentUser = async (req, res) => {
//   const { name, email } = req.user;
//   res.json({ user: { name, email } });
// }

// module.exports.createUser = async (req, res) => {
//   console.log(req.body);
//   const { body } = req;
//   const user = await UserModel.create(body);
//   res.status(201).send({ data: user });
// };




