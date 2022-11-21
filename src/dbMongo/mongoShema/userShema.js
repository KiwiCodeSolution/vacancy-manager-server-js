const mongoose = require('../mongoose/mongoose');

const usersShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
});
const UserModel = mongoose.model('users', usersShema);
module.exports = UserModel;
