const {Thought,User} = require('../models');

module.exports = {
  //Get all Users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Get a single user by ID
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

   // Create a User
   async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  
  //Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: User.Thought } });
      res.json({ message: 'user has been deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

// Update a user
async updateUser(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'No user with this id!' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
},

//Add a friend
async addFriend(req,res){
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: 
        {
        friends:req.params.friendId
      } 
    },
      { runValidators: true, new: true }
    );

  if (!user) {
      res.status(404).json({ message: 'No user with this id!' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
},

//Delete a Friend
async deleteFriend(req, res) {
  try {
      const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { runValidators: true, new: true }
      );   
  
      if (!user) {
          return res.status(404).json({ message: 'user and friend ID has been deleted!' });
      }

      res.json(user);
  } catch (err) {
      res.status(500).json(err);
  }
},

};




