const { Unauthorized } = require("http-errors");
const UserModel = require("../dbMongo/models/UserModel");

module.exports = async function (req, res, next) {
    try {
        if (!req.headers.authorization) throw new Unauthorized("No authorization in header");

        const [bearer, userToken] = req.headers.authorization.split(" ");
        if (bearer !== "Bearer") throw new Unauthorized("Not authorized not find bearer");
        if (!userToken) throw new Unauthorized("Not authorized not found token");

        const user = await UserModel.findOne({ userToken });
        if (!user) throw new Unauthorized("user not authorized ");
        
        req.user = user;
        
        next();
    } catch ({ message }) {
        res.json({ message })
    }
};
