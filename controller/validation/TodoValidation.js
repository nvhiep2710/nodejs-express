const Joi = require("@hapi/joi");

const createValidation = data => {
  const schema = Joi.object({
    title: Joi.string()
      .min(1)
      .required()
  });
  return schema.validate(data);
};

module.exports.createValidation = createValidation;
