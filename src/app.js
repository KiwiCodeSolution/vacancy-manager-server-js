const express = require('express');

const app = express();

const { createUser, getUsers } = require('./controller/userController');

app.use(express.json());

app.post('/', createUser);

app.get('/', getUsers);

module.exports = app;
