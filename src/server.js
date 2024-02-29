const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/Users');
const Thought = require('./models/Thoughts');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/api/users', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.put('/api/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

app.delete('/api/users/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.json(user);
});

app.get('/api/thoughts', async (req, res) => {
  const thoughts = await Thought.find({});
  res.json(thoughts);
});

app.post('/api/thoughts', async (req, res) => {
  const thought = await Thought.create(req.body);
  res.json(thought);
});

app.put('/api/thoughts/:id', async (req, res) => {
  const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(thought);
});

app.delete('/api/thoughts/:id', async (req, res) => {
  const thought = await Thought.findByIdAndDelete(req.params.id);
  res.json(thought);
});

// Add a friend
app.post('/api/users/:userId/friends/:friendId', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.userId, { $push: { friends: req.params.friendId } }, { new: true });
  res.json(user);
});

// Remove a friend
app.delete('/api/users/:userId/friends/:friendId', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
  res.json(user);
});

// Add a reaction
app.post('/api/thoughts/:thoughtId/reactions', async (req, res) => {
  const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true });
  res.json(thought);
});

// Remove a reaction
app.delete('/api/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
  const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
  res.json(thought);
});

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));