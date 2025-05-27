// middleware/formValidator.js
const { body } = require('express-validator');

const formValidator = [
  body('fullName')
    .trim()
    .isLength({ min: 2 })
    .withMessage("Full Name must be at least 2 characters."),

  body('email')
    .trim()
    .isEmail()
    .withMessage("A valid Email is required."),

  body('address')
    .trim()
    .isLength({ min: 5 })
    .withMessage("Address must be at least 5 characters."),

  body('phone')
    .trim()
    .matches(/^\d{10}$/)
    .withMessage("Phone Number must be exactly 10 digits."),

  body('startupName')
    .trim()
    .isLength({ min: 2 })
    .withMessage("Startup Name must be at least 2 characters."),

  body('startupWebsite')
    .optional({ checkFalsy: true })
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage("Startup Website must be a valid URL starting with http:// or https://"),

  body('stage')
    .notEmpty()
    .withMessage("Startup Stage is required."),

  body('pitch')
    .trim()
    .isLength({ min: 50 })
    .withMessage("Pitch must be at least 50 characters."),

  body('teamSize')
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("Team size must be a valid number.")
];

module.exports = formValidator;
