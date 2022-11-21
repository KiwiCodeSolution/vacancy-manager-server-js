const userModel = require('../dbMongo/mongoShema/userShema');

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

}

module.exports.logout = async (req, res) => {

}


module.exports.currentUser = async (req, res) => {
  const { name, email } = req.user;
  res.json({ user: { name, email } });
}