const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainSchema = new mongoose.Schema({
  fullName:{
    firstName: {
    type: String,
    required: true,
    minLength:[2, "First name must be at least 2 characters long"],
    
    },

   lastName: {
    type: String,
    minLength:[3, "Last name must be at least 3 characters long"],
    }
  },                                 

  email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"],
        minLength: [5, "Email must be at least 5 characters long"],
      },

  password: {
        type: String,
        required: true,
        select: false,
      },

  socketId: {
        type: String
    }, 

  status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },

  vehicle: {
        
        
        color:{
          type: String, 
          required: true,
          minlength: [3, "Vehicle name must be at least 3 characters long"]
      },
        plate: {
            type: String,
            required: true,
            minlength:[3, "Plate number must be at least 3 characters long"],
            
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"],
            
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto'],
            default: 'car'
            
        }
        // other fields...
        },

    location:{
        lat:{
            type: Number
            
        },
        lng:{type:Number

        }

    }
    
  });
  
captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return token;
  };   

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);    
  };

captainSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };




  module.exports = mongoose.model("Captain", captainSchema);    
  