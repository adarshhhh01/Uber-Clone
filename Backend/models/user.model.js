const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength:[2, "First name must be at least 2 characters long"]
   
  },
  lastName: {
    type: String,
    minLength:[3, "First name must be at least 2 characters long"],
    
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, "Email must be at least 5 characters long"]
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  socketId: {
    type: String
  }

});


userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};   

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;

// module.exports = mongoose.model('User', userSchema);