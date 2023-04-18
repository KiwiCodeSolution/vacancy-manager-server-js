const { BadRequest } = require("http-errors");

module.exports.update = async (req, res) => {
  const profileData = req.body;

  if (!profileData) throw new BadRequest("no profileData to update");
  if (typeof(profileData) !== "object") throw new BadRequest("profileData shoul be an object");
  if (Array.isArray(profileData)) throw new BadRequest("profileData shoul be an object");
  
  req.user.profile = { ...req.user.profile, ...profileData};
  await req.user.save();
  res.json({message: "profile updated", profile: req.user.profile});
};
