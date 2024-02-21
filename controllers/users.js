const usersRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const Note = require('../models/Note');
const User = require('../models/User');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('notes');
  res.status(200).json(users);
});

usersRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).populate('notes');

  res.json(user);
});

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    const user = new User({ username, name, passwordHash });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
 