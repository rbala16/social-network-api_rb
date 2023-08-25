//Require Mongoose
const { Schema, model ,Types} = require('mongoose');
// import moment module to format the timestamp 
const moment = require('moment');

const ReactionSchema = new Schema({
  reactionId: {
      type: Types.ObjectId,
      default: new Types.ObjectId()
  },
  reactionBody: {
      type: String,
      required: true,
      maxLength: 280
  },
  username: {
      type: String,
      required: true
  },
  createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  }
},
{
  toJSON: {
    virtuals:true,
      getters: true
  },
  id: false
});


//thought schema
const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
},
createdAt: {
  type: Date,
  default: Date.now,
  get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
},
username: {
  type: String,
  required: true
},
reactions: [ReactionSchema]
},
{
  toJSON: {
    virtuals: true,
    getters:true,
  },
  id: false,
}

);

//total count of reactions
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);
// export the Thought model
module.exports = Thought;

