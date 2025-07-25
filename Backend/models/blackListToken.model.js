const mongoose = require("mongoose");

const BlackListTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // Token will expire after 1 day
  },
});
    

    
    module.exports = mongoose.model("BlackListToken", BlackListTokenSchema);