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

module.exports.registration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "ошибка при валидации", errors })
    };
    const { username, password } = req.body
    const candidate = await UserModel.findOne({ username });
    console.log(candidate);
    if (candidate) {
      return res.status(400).json({ message: 'пользователь с таким именем уже существует' })
    };
    const hashPassword = bcrypt.hashSync(password, 7);

    const user = new UserModel({ username, passsword: hashPassword });
    await user.save();
    return res.json({ message: "Пользователь успешно зарегестрирован" });

  } catch (error) {
    res.status(400).json({ message: 'Registration erroe' });
  };
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    console.log(username)
    const user = await UserModel.findOne({ username })

    if (!user) {
      return res.status(400).json({ message: `пользователь ${username} не найден ` })
    }
    const validPassword = bcrypt.compareSync(password, user.passsword)
    if (!validPassword) {

      return res.status(400).json({ message: "введен не верный пароль" })

    }
    const token = generateAccessToken(user._id, username)
    return res.json({ token })

  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'login erroe' });
  }
}

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




