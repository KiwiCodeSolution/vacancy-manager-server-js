const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { BadRequest } = require("http-errors");
const UserModel = require("../dbMongo/models/UserModel");
const { initialProfile, initialSettings } = require("../config/initialsData");

module.exports.googleAuth = async (req, res) => {
  const { name, email, picture, sub } = req.body.userData;
  const user = await UserModel.findOne({ email });

  if (!user) { // register googleUser
    const user = new UserModel({
      passwordGoogle: bcrypt.hashSync(sub, 7),
      email,
      emailConfirmed: false,
      profile: initialProfile,
      settings: initialSettings,
      password: "",
      profileGoogle: { name, avatar: picture }
    });
    await user.save();
    user.token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    await user.save();
    return res.json({
      email: user.email,
      token: user.token,
      profile: user.profileGoogle,
      settings: user.settings
    });
  };
  const validPassword = bcrypt.compareSync(sub, user.passwordGoogle);
  if (!validPassword) throw new BadRequest("Bad password");

  // User exist, logging though Google
  if (!user.profileGoogle) user.profileGoogle = { name, avatar: picture };
  if (!user.passwordGoogle) user.passwordGoogle = bcrypt.hashSync(sub, 7);
  user.token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
  await user.save();
  
  res.json({
    email,
    profile: { ...user.profile, name, avatar: picture },
    token: user.token,
    settings: user.settings,
  });
};