const express = require('express');
const mongoose = require('mongoose');

const DB_NAME = process.env.DB_NAME || 'db_user';
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

mongoose
  .connect(`mongodb://localhost:27017/${DB_NAME}`)
  .then(() => {
    console.log('mongodb run');
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const users = new mongoose.Schema({
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

const User = mongoose.model('users', users);

app.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const user = await User.create(body);

    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
});

app.get('/', async (req, res, next) => {
  try {
    const getUsers = await User.find();

    res.status(200).send({ data: getUsers });
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => {
  console.log('server is up');
});
