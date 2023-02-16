const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { BadRequest, Unauthorized, NotFound, Conflict } = require("http-errors");
const { validationResult } = require("express-validator");
const { secret } = require("../config/config");
const UserModel = require("../dbMongo/models/UserModel");

const generateAccessToken = id => jwt.sign({ id }, secret);

module.exports.registration = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new BadRequest("ошибка при валидации");

  const { username = "unonymous", password, email } = req.body;
  const candidate = await UserModel.findOne({ email });
  if (candidate) throw new Conflict("пользователь с таким имейлом уже существует");

  const hashPassword = bcrypt.hashSync(password, 7);
  const user = new UserModel({
    username,
    password: hashPassword,
    email,
    token: null,
    data: {avatar:"", phoneNumber:"", positoin:""}
  });
  await user.save();
  return res.json({ message: "Пользователь успешно зарегистрирован" });
};

module.exports.login = async (req, res) => {
  const { username, password, email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) throw new NotFound(`пользователь ${username} не найден `);

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) throw new BadRequest("введен неверный пароль");

  const token = generateAccessToken(user._id);

  user.token = token;
  await user.save();

  res.json({ user });
};

module.exports.logout = async (req, res) => {
  req.user.token = null;
  await req.user.save();

  res.json({ message: "User logged out" });
};

module.exports.getUser = async (_req, res) => {
  const getUsers = await UserModel.find();
  res.send({ data: getUsers });
};

module.exports.getCurrent = async (req, res) => {
  console.log("getCurrent");
  const { username, email } = req.user;
  res.json({ username, email });
}
