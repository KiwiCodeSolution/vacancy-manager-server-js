const { BadRequest } = require("http-errors");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

module.exports.update = async (req, res) => {
  const profileData = req.body;

  if (!profileData) throw new BadRequest("no profileData to update");
  if (typeof(profileData) !== "object") throw new BadRequest("profileData shoul be an object");
  if (Array.isArray(profileData)) throw new BadRequest("profileData shoul be an object");
  
  req.user.profile = { ...req.user.profile, ...profileData};
  await req.user.save();
  res.json({message: "profile updated", profile: req.user.profile});
};

module.exports.uploadAvatar = async (req, res) => {
  const file = req.body.data;
  const { CLOUD_NAME, CLOUD_APIKEY, CLOUD_APISECRET} = process.env;

  cloudinary.config({
    cloud_name:CLOUD_NAME,
    api_key:CLOUD_APIKEY,
    api_secret:CLOUD_APISECRET
  });

  const uploadedResponse = await cloudinary.uploader.upload(file, {folder: "Avatars"});
  req.body = {avatar: uploadedResponse.url};
  this.update(req, res);
};