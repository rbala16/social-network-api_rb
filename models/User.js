//Require Mongoose
const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username:{
      type:String,
      unique:true,
      required:true,
      trim:true
    },
    email:{
      type:String,
      unique:true,
      required:true,
      //use regex for matching an email
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
     },
     thoughts:[
      {
      type:Schema.Types.ObjectId,
      ref: 'Thought'
     },
    ],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
     },
    ],

  },
  {
    toJSON: {
      virtuals: true,
      getters:true,
    },
    id: false,
  }

)

//total count of friends
UserSchema.virtual('friendCount').get(function(){
  return this.friends.length;
})

// create the User model using the User Schema
const User = model('User', UserSchema);

//Export User Module
module.exports = User;