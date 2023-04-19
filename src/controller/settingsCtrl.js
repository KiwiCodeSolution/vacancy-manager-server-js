const { BadRequest } = require("http-errors");

module.exports.update = async (req, res) => {
  const settingsData = req.body;

  if (!settingsData) throw new BadRequest("no settings data to update");
  if (typeof(settingsData) !== "object") throw new BadRequest("settings data shoul be an object");
  if (Array.isArray(settingsData)) throw new BadRequest("settings sata shoul be an object");
  
  req.user.settings = { ...req.user.settings, ...settingsData};
  await req.user.save();
  res.json({message: "settings updated", settings: req.user.settings});
};