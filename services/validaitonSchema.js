const Joi = require("joi");
const registrationValidation = Joi.object({
  fullname: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  gender: Joi.string().required(),
  address: Joi.string().required(),
});
const loginValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid("user", "admin").default("user"),
});

module.exports = { registrationValidation, loginValidation };
