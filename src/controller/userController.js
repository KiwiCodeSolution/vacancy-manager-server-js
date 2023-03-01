const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { BadRequest, NotFound, Conflict } = require("http-errors");
const { validationResult } = require("express-validator");
const { secret } = require("../config/config");
const UserModel = require("../dbMongo/models/UserModel");

const generateAccessToken = id => jwt.sign({ id }, secret);

module.exports.registration = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new BadRequest("ошибка при валидации");

  const { password, email } = req.body;
  const candidate = await UserModel.findOne({ email });
  if (candidate) throw new Conflict("пользователь с таким имейлом уже существует");

  const hashPassword = bcrypt.hashSync(password, 7);
  const user = new UserModel({
    password: hashPassword,
    email,
    token: null,
    profile: {avatar:"", phoneNumber:"", position:""}
  });
  await user.save();
  user.token = generateAccessToken(user._id);
  return res.json({ message: "Пользователь успешно зарегистрирован", user });
};

module.exports.emailVerification = async (req, res) => {
  const { token } = req.query;
  if (!token) throw new BadRequest();
  const user = await UserModel.findOne({token}).select("email token profile");
  if (!user) throw new NotFound("user not Found");

  res.json({user});
};

module.exports.login = async (req, res) => {
  const { password, email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) throw new NotFound("пользователь не найден");

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) throw new BadRequest("введен неверный пароль");

  user.token = generateAccessToken(user._id);
  await user.save();
  res.json({ user });
};

module.exports.logout = async (req, res) => {
  req.user.token = null;
  await req.user.save();
  res.json({ message: `User ${req.user.profile.username} logged out` });
};

module.exports.getUser = async (_req, res) => {
  const getUsers = await UserModel.find();
  res.send({ data: getUsers });
};

module.exports.getCurrent = async (req, res) => {
  console.log("getCurrent");
  const { email, profile } = req.user;
  res.json({ email, profile });
}
