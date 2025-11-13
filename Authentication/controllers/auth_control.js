const User = require('../models/users');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "demo", {
    expiresIn: maxAge
  });
}

const handleError = (err) => {
  const errors = { email: '', password: '' };

  if (err.code === 11000) {
   errors.email = 'Email already exist!';
   return error.email;
  }

  if (err.includes('user validation failed')) { 
    Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });
  }

  return errors;
}

const signupGet = (req, res) => { 
  res.render('signup'); 
}

const signupPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
    res.status(201).json({ user: user._id});
  } catch (err) {
    const error = handleError(err);
    res.status(400).json({ error });
  }
} 

const loginGet = (req, res) => { 
  res.render('login');
} 

const loginPost = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  res.send('User login');
} 

module.exports = {
  signupGet,
  signupPost,
  loginGet,
  loginPost
}