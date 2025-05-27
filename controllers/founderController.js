const { validationResult } = require('express-validator');
const submissions = [];

module.exports.submitForm = (req, res) => {
  const errors = validationResult(req);
  const formErrors = errors.array().map(err => err.msg);

  const {
    fullName,
    email,
    address,
    phone,
    startupName,
    startupWebsite,
    stage,
    pitch,
    teamSize
  } = req.body;

  const image = req.file ? req.file.filename : null;

  if (!image) {
    formErrors.push("Please upload an image.");
  }


  if (formErrors.length > 0) {
    return res.render('index', {
      errors: formErrors,
      formData: req.body,
      success: '',
      submissions
    });
  }

  const newSubmission = {
    fullName,
    email,
    address,
    phone,
    startupName,
    startupWebsite,
    stage,
    pitch,
    teamSize: teamSize || 'N/A',
    image
  };

  submissions.push(newSubmission);
  req.session.latestSubmission = newSubmission;
  res.redirect('/success');
};

module.exports.getSuccessPage = (req, res) => {
  const latestSubmission = req.session.latestSubmission;
  if (!latestSubmission) return res.redirect('/');
  req.session.latestSubmission = null;
  res.render('success', { submission: latestSubmission });
};
