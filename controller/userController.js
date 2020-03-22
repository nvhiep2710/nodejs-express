const User = require("../models/User");

module.exports.update = async (req, res) => {
  // res.send(req.file.path);
  try {
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
