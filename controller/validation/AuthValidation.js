const Joi = require("@hapi/joi");

const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};
const loginValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};

const loginSocialValidation = data => {
  const schema = Joi.object({
    social_id: Joi.string().required(),
    social_type: Joi.string().required(),
    name: Joi.string()
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.loginSocialValidation = loginSocialValidation;
