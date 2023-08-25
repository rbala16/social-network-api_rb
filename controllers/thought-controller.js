const {Thought,User} = require('../models');

module.exports = {
//Get all Thoughts 
async getThoughts(req, res) {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
},

//Get a single thought by ID
async getSingleThought(req, res) {
  try {
    const thoughts = await Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v');

    if (!thoughts) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
},

// Create Thought
async createThought(req, res) {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: _id } },
        { runValidators: true, new: true }
    )
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},

//update thought

async updateThought(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thought) {
      res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
},

//delete thought
async deleteThought(req, res) {
  try {
      const thought = await Thought.findOneAndUpdate(
        { username: req.params.username },
        { $pull: { thought: { thoughtText: req.params.thoughtText } } },
        { runValidators: true, new: true }
      );   
  
      if (!thought) {
          return res.status(404).json({ message: `No thought found with this ${username}` });
      }

      res.json(thought);
  } catch (err) {
      res.status(500).json(err);
  }
},
}