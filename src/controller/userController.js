const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('../config/config')
const UserModel = require('../dbMongo/mongoShema/UserModel');

const generateAccessToken = (id, username) => {
  const payload = {
    id,
    username
  }
  return jwt.sign(payload, secret, { expiresIn: "24h" })
}

module.exports.createUser = async (req, res) => {
  console.log(req.body);
  const { body } = req;
  const user = await userModel.create(body);
  res.status(201).send({ data: user });
};

module.exports.getUsers = async (req, res) => {
  const getUsers = await userModel.find();
  res.status(200).send({ data: getUsers });
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    console.log(username)
    const user = await UserModel.findOne({ username })

  }

      return res.status(400).json({ message: "введен не верный пароль" })

  res.json({ request: req.body });
}; const token = generateAccessToken(user._id, username)
return res.json({ token })

  } catch (error) {
  console.log(error)

  res.status(400).json({ message: 'login erroe' });
}
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




