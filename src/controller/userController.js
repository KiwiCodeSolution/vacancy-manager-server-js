const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { BadRequest, NotFound, Conflict } = require("http-errors");
const { validationResult } = require("express-validator");
const { secret } = require("../config/config");
const UserModel = require("../dbMongo/models/UserModel");
const sendEmail = require("../mail/mailer");

const generateAccessToken = id => jwt.sign({ id }, secret);

const baseClientURL = "http://kiwicode.tech:3000/";
// const baseClientURL = "vacman.netlify.app/";

const makeHtml = (verificationToken) => `<h4> Hello dear customer </h4><br/>
    <p>We found you've been registered to Vacancy Manager app.</P>
    <a target="_blank" href="${baseClientURL}confirmEmail?verificationCode=${verificationToken}">
    Please, press here to confirm your email account</a>`;
const makeHtmlPassRestore = (verificationToken) => `<h4> Hello dear customer </h4><br/>
    <p>We are ready to change your password in Vacancy Manager app.</P>
    <a target="_blank" href="${baseClientURL}passCodeVerify?PassRestoreCode=${verificationToken}">
    Please, press here to continue</a>`;

module.exports.registration = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new BadRequest("ошибка при валидации");

  const { password, email } = req.body;
  const letterSubject = "\"Vacancy Manager App\" Mail confirmation";
  const candidate = await UserModel.findOne({ email });

  if (candidate) {
    if (candidate.emailConfirmed) {
      throw new Conflict("пользователь с таким имейлом уже существует");
    } else { // Почта не подтверждена
      if (candidate.verificationCode) {// Если есть код, 
        throw new BadRequest("Имейл не подтверждён, проверьте почту");
      } else { // делаем проверочный verificationCode и высылаем на почту
        candidate.verificationCode = generateAccessToken(candidate._id);
        candidate.password = bcrypt.hashSync(password, 7);
        candidate.profile = { avatar: "", phoneNumber: "", position: "" };
        candidate.settings = { lang: "eng", notification: false, theme: "white" };
        await candidate.save();
        setTimeout(() => {
          candidate.verificationCode = "";
          candidate.save();
        }, 3600000);

        sendEmail({ email, html: makeHtml(candidate.verificationCode), letterSubject });
        
        return res.json({
          message: `на почту ${candidate.email} выслано письмо с подтверждением`,
          verificationCode: candidate.verificationCode // УДАЛИТЬ, когда сделаем отправку письма
        });
      }
    }
  };

  const user = new UserModel({
    password: bcrypt.hashSync(password, 7),
    email,
    emailConfirmed: false,
    profile: { avatar: "", phoneNumber: "", position: "" },
    settings: { lang: "eng", notification: false, theme: "white" },
  });
  await user.save();
  user.verificationCode = generateAccessToken(user._id);
  await user.save();
  setTimeout(() => {
    user.verificationCode = "";
    user.save();
  }, 3600000);

  sendEmail({ email, html: makeHtml(user.verificationCode), letterSubject });

  return res.json({
    message: `на почту ${user.email} выслано письмо с подтверждением`,
  });
};

module.exports.emailVerification = async (req, res) => {
  const { verificationCode } = req.query;
  if (!verificationCode) throw new BadRequest();

  const user = await UserModel.findOne({ verificationCode });
  if (!user) throw new NotFound("user not Found");
  user.emailConfirmed = true;
  user.verificationCode = "";
  user.token = generateAccessToken(user._id);
  user.save();
  const { email, token, profile, settings } = user;
  res.json({
    message: "e-mail confirmed successfully",
    user: { email, token, profile, settings }
  });
};

module.exports.login = async (req, res) => {
  const { password, email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) throw new NotFound("user not Found");

  if (!user.password) { // небыло регистрации через почту
    throw new BadRequest("User wasn't registered by e-mail, try to use Google authorization");
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) throw new BadRequest("Bad password");

  if (!user.emailConfirmed) throw new BadRequest("E-mail confirmation required");

  user.token = generateAccessToken(user._id);
  await user.save();

  const { token, profile, settings } = user;
  res.json({
    message: "login successfull",
    user: { email, token, profile, settings }
  });
};

module.exports.logout = async (req, res) => {
  req.user.token = null;
  await req.user.save();
  res.json({ message: `User ${req.user.email} logged out successfull` });
};

module.exports.getUser = async (_req, res) => {
  const getUsers = await UserModel.find();
  res.send({ data: getUsers });
};

module.exports.getCurrent = async (req, res) => {
  const { email, token, profile, settings } = req.user;
  const { currProfile } = req.query;
  if (currProfile === "google") return res.json({ email, token, profile: { ...profile, ...req.user.profileGoogle }, settings });
  res.json({ email, token, profile, settings });
};

module.exports.passRestore = async (req, res) => {
  const { email } = req.body;
  if (!email) throw new BadRequest("email required !");
  const user = await UserModel.findOne({ email });

  if (!user) throw new NotFound("user not found");
  if (!user.emailConfirmed) throw new BadRequest("Email doesn't confirmed. Имейл не подтверждён, проверьте почту");
  user.verificationCode = generateAccessToken(user._id);
  user.save();
  sendEmail({
    email,
    html: makeHtmlPassRestore(user.verificationCode),
    letterSubject: "\"Vacancy Manager App\" Password Restoration"
  });
  res.json({ message: `на почту ${email} выслано письмо с инструкцией` });
};

module.exports.passCodeVerify = async (req, res) => {
  const { verificationCode } = req.body;
  if (!verificationCode) throw new BadRequest("verificationCode required");

  const user = UserModel.findOne({ verificationCode });
  if (!user) throw new NotFound("No user with that verificationCode");
  user.verificationCode = "";
  user.token = generateAccessToken(user._id);
  user.save();
  const { email, token, profile, settings } = user;
  res.json({ message: "pass code verified", user: { email, token, profile, settings } });
};

module.exports.changePass = async (req, res) => {
  const { password } = req.body;
  if (!password) throw new BadRequest("password required");
  // validate password
  req.user.password = bcrypt.hashSync(password, 7);
  req.user.save();
  res.json({ message: "password changed successfully" });
};