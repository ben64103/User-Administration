const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Note = require('../models/Note');
const { model } = require('mongoose');
const notesRouter = require('express').Router();

const getTokenFrom = (req) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
};

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({});
  res.json(notes);
});

notesRouter.get('/:id', async (req, res) => {
  const noteId = req.params.id;
  const note = await Note.findById(noteId);
  res.json(note);
});

notesRouter.post('/', async (req, res) => {
  const body = req.body;
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ err: 'token invalid!' });
  }

  const user = await User.findById(decodedToken.id);
  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    user: user.id,
  });
  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  res.status(201).json(savedNote);
});

module.exports = notesRouter;
