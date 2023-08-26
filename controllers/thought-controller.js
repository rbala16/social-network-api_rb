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
       req.body.userId ,
       { $addToSet: { thoughts: thought._id } },
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
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

    if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
    }

      res.json({message: 'Thought has been deleted!!'});
  } catch (err) {
      res.status(500).json(err);
  }
},

// create reaction
async createReaction(req, res) {
  try {
    const reaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body} },
                { new: true })
                .populate({path: 'reactions', select: '-__v'})
                .select('-__v')

                
                if (!reaction) {
                  return res.status(404).json({ message: 'No reaction with this id!'});
              }
        
              res.json(reaction);
          } catch (err) {
              res.status(500).json(err);
          }
        },

        //delete reaction 
        async deleteReaction(req, res) {
          try {
              const thought = await Thought.findOneAndUpdate(
                  { _id: req.params.thoughtId},
                  { $pull:{reactions: { reactionId: req.params.reactionId }} },
                  { runValidators: true, new: true }
              );   
          
              if (!thought) {
                  return res.status(404).json({ message: 'user and reaction ID has been deleted!' });
              }
        
              res.json({message: 'User Reaction has been deleted!!'});
          } catch (err) {
              res.status(500).json(err);
          }
        },
}