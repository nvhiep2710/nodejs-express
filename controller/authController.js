const User = require("../models/User");
const {
  registerValidation,
  loginValidation
} = require("./validation/AuthValidation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.login = async (req, res) => {
  const { error } = loginValidation(res.body);
  if (error) return res.status(400).send(error);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(200)
        .json({ status: 400, message: "Email does not exist" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(200).json({ status: 400, message: "Password Invalid" });
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d"
    });
    res.header("Authorization", token);
    res.status(200).json({
      status: 200,
      message: "Login success",
      data: {
        user: {
          name: user.name,
          email: user.email
        },
        access_token: token
      }
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports.register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error);

  try {
    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist)
      return res
        .status(200)
        .json({ status: 400, message: "Email already exist" });

    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hasedPassword
    });
    await user.save();
    res.status(200).json({
      status: 200,
      message: "Register success",
      data: { user: user._id }
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
