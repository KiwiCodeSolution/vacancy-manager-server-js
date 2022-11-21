const userModel = require('../dbMongo/mongoShema/userShema');

module.exports.getUsers = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await userModel.create(body);

    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const getUsers = await userModel.find();

    res.status(200).send({ data: getUsers });
  } catch (error) {
    next(error);
  }
};
