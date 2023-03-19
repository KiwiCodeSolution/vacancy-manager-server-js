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
  if (candidate) {
    if (candidate.emailConfirmed) {
      throw new Conflict("пользователь с таким имейлом уже существует");
    } else {
      throw new Conflict("Имейл не подтверждён, проверьте почту");
    }
  };

  const hashPassword = bcrypt.hashSync(password, 7);
  const user = new UserModel({
    password: hashPassword,
    email,
    emailConfirmed: false,
    profile: {avatar:"", phoneNumber:"", position:""}
  });
  await user.save();
  user.token = generateAccessToken(user._id);
  await user.save();
  // send an email with emailConfirmation link ...
  return res.json({ message: "Пользователь успешно зарегистрирован" });
};

module.exports.emailVerification = async (req, res) => {
  const { token } = req.query;
  if (!token) throw new BadRequest();

  const user = await UserModel
    .findOne({token})
    .select({ email: 1, token: 1, profile: 1, _id: 0 });
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

module.exports.sendEmail = async () => {
// найди юзера, внести его новый пароль в БД, отправь имейл с токеном
};

module.exports.logout = async (req, res) => {
  req.user.token = null;
  await req.user.save();
  res.json({ message: `User ${req.user.email} logged out` });
};

module.exports.getUser = async (_req, res) => {
  const getUsers = await UserModel.find();
  res.send({ data: getUsers });
};

module.exports.getCurrent = async (req, res) => {
  const { email, token, profile } = req.user;
  const { currProfile } = req.query;
  if(currProfile === "google") return res.json({ email, token, profile: {...profile, ...req.user.profileGoogle} }); 
  res.json({ email, token, profile });
};
